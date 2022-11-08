import { observer } from 'mobx-react';

import { useContext, useEffect, useState, useRef } from 'react';
import { wsUrl } from '../../config/ws_url';
import MouseStore from '../../store/PositionStore';
import OptionStore from '../../store/OptionStore';
import SvgStore from '../../store/SvgStore';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './style.css'
import { lastMesHandle, mesHandle } from '../../utils/mesHandle';


export default observer(function SvgPaint() {

  const { sendMessage, readyState, lastMessage } = useWebSocket(wsUrl, { share: true })

  const inputRef = useRef(null)

  useEffect(() => {
    sendMessage(mesHandle(0))
  }, [])

  useEffect(() => {
    const mess = lastMesHandle(lastMessage)
    if (mess) {
      if (mess.type === 100) {
        svgStore.addPath(mess.data, mess.fromId)
      } else if (mess.type === 101) {
        svgStore.drawPath(mess.data, mess.fromId)
      } else if (mess.type === 102) {
        svgStore.addRect(mess.data, mess.fromId)
      } else if (mess.type === 103) {
        svgStore.drawRect(mess.data, mess.fromId)
      } else if (mess.type === 104) {
        svgStore.addArrow(mess.data, mess.fromId)
      } else if (mess.type === 105) {
        svgStore.drawArrow(mess.data, mess.fromId)
      } else if (mess.type === 106) {
        svgStore.addText(mess.data, mess.fromId)
      } else if (mess.type === 107) {
        svgStore.drawText(mess.data, mess.fromId)
      } 
    }
  }, [lastMessage])

  const optionStore = useContext(OptionStore)
  const svgStore = useContext(SvgStore)
  const mouseStore = useContext(MouseStore)
  const [ showInput, setShowInput ] = useState(false)
  const inputStyle = {
    left: mouseStore.startX - 2,
    top: mouseStore.startY - 12,
    zIndex: 9999,
    display: showInput ? 'block' : 'none',
    caretColor: optionStore.color
  }

  const handleMouseDown = (e) => {
    mouseStore.mouseDownAciton()
    mouseStore.handleMouseDown(e)
    if (optionStore.tool === 'highlight') {
      svgStore.addPath({ startX: mouseStore.x, startY: mouseStore.y, d: '', stroke: optionStore.color }, localStorage.getItem('userId'))
      sendMessage(mesHandle(201,
      {
        type: 100,
        data: { startX: mouseStore.x, startY: mouseStore.y, d: '', stroke: optionStore.color},
        fromId: localStorage.getItem('userId')
      }))
    } else if (optionStore.tool === 'border') {
      svgStore.addRect({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color }, localStorage.getItem('userId'))
      sendMessage(mesHandle(201,
      {
        type: 102,
        data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color },
        fromId: localStorage.getItem('userId')
      }))
    } else if (optionStore.tool === 'pull-request') {
      svgStore.addArrow({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, markerEnd: 'url(#arrow)' }, localStorage.getItem('userId'))
      sendMessage(mesHandle(201,
      {
        type: 104,
        data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, markerEnd: '#arrow' },
        fromId: localStorage.getItem('userId')
      }))
    } else if (optionStore.tool === 'font-size') {
      inputRef.current.value = ''
      setShowInput(true)
      inputRef.current.focus()
      svgStore.addText({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, text: '' }, localStorage.getItem('userId'))
      sendMessage(mesHandle(201,
      {
        type: 106,
        data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, text: ''},
        fromId: localStorage.getItem('userId')
      }))
    } 
  }

  const handleMouseMove = () => {
    if (mouseStore.mouseDown) {
      if (optionStore.tool === 'highlight') {
        svgStore.drawPath({ x: mouseStore.x, y: mouseStore.y }, localStorage.getItem('userId'))
        sendMessage(mesHandle(201,
        {
          type: 101,
          data: { x: mouseStore.x, y: mouseStore.y},
          fromId: localStorage.getItem('userId')
        }))
      } else if (optionStore.tool === 'border') {
        svgStore.drawRect({ x: mouseStore.x, y: mouseStore.y }, localStorage.getItem('userId'))
        sendMessage(mesHandle(201,
        {
          type: 103,
          data: { x: mouseStore.x, y: mouseStore.y},
          fromId: localStorage.getItem('userId')
        }))
      } else if (optionStore.tool === 'pull-request') {
        svgStore.drawArrow({ x: mouseStore.x, y: mouseStore.y }, localStorage.getItem('userId'))
        sendMessage(mesHandle(201,
        {
          type: 105,
          data: { x: mouseStore.x, y: mouseStore.y },
          fromId: localStorage.getItem('userId')
        }))
      }
    }
  }

  const handleMouseUp = () => {
    mouseStore.mouseUpAction()

  }

  const inputChange = (e) => {
    if (mouseStore.mouseDown) {
      if (optionStore.tool === 'font-size') {
        svgStore.drawText({ x: mouseStore.startX, y: mouseStore.startY, text: e.target.value }, localStorage.getItem('userId'))
        sendMessage(mesHandle(201,
        {
          type: 107,
          data: { x: mouseStore.startX, y: mouseStore.startX, text: e.target.value },
          fromId: localStorage.getItem('userId')
        }))
      }
    }
  }

  const handleGraph = (graphs) => {
    let res = []
    graphs.forEach((graph) => {
      res.push(graph)
    });
    // console.log(res[0]?.d)
    return res
  }
  return (
    <div >
      <div>
        {
          svgStore.svg.map((item, index) =>
            <svg className={"svg-paint " + optionStore.bg}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={index === svgStore.currentPage - 1 ? { zIndex: 2 } : {}} key={item.id}
            >
              {handleGraph(item.path).map((path, index) =>
                <path d={path.d} stroke={path.stroke} strokeWidth={path.strokeWidth} key={index} fill={path.fill} strokeLinecap={'round'} />
              )}
              {handleGraph(item.rect)?.map((rect, index) =>
                <rect key={index} width={rect.width} fill={rect.fill} height={rect.height} stroke={rect.stroke} strokeWidth={rect.strokeWidth} x={rect.x} y={rect.y} />
              )}
              <defs>
                <marker id="arrow" markerUnits = "strokeWidth" markerWidth = "12" markerHeight = "12" viewBox = "0 0 12 12" refX = "6" refY = "6" orient = "auto" >
                  <path d="M2,2 L8,6 L2,10 L6,6 L2,2" fill = "#000000;" />
                </marker>
              </defs>
              {handleGraph(item.arrow)?.map((arrow, index) =>
                <line key={index} fill={arrow.fill} stroke={arrow.stroke} strokeWidth={arrow.strokeWidth} x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2} markerEnd={arrow.markerEnd} />
              )}
              {handleGraph(item.text)?.map((text, index) =>
                <text key={index} fill={text.fill} stroke={text.stroke} strokeWidth={text.strokeWidth} x={text.x} y={text.y}>{text.text}</text>
              )}
            </svg>
          )
        }
      </div>
      <div style={{ position: 'fixed', bottom: 1, right: 10, zIndex: 99, userSelect: 'none' }} data-html2canvas-ignore>
        {svgStore.currentPage} / {svgStore.totalPage}
      </div>
      <div>
        <input className='text-input' type="text" style={inputStyle} onChange={inputChange} ref={inputRef} />
      </div>
    </div>
  )
})
