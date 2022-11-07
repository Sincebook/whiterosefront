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
      } 
    }
  }, [lastMessage])

  const optionStore = useContext(OptionStore)
  const svgStore = useContext(SvgStore)
  const mouseStore = useContext(MouseStore)


  const handleMouseDown = () => {
    mouseStore.mouseDownAciton()
    console.log(optionStore.tool)
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
      }
    }
  }

  const handleMouseUp = () => {
    mouseStore.mouseUpAction()

  }

  const handlePath = (paths) => {
    let res = []
    paths.forEach((path) => {
      res.push(path)
    });
    // console.log(res[0]?.d)
    return res
  }
  const handleRect = (rects) => {
    let res = []
    rects.forEach((rect) => {
      res.push(rect)
    });
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
                {/* {
                  handlePath(item.path)
                } */}
              {handlePath(item.path).map((path, index) =>
                <path d={path.d} stroke={path.stroke} strokeWidth={path.strokeWidth} key={index} fill={path.fill} strokeLinecap={'round'} />
              )}
              {handleRect(item.rect)?.map((rect, index) =>
                <rect key={index} width={rect.width} fill={rect.fill} height={rect.height} stroke={rect.stroke} strokeWidth={rect.strokeWidth} x={rect.x} y={rect.y} />
              )}
            </svg>
          )
        }
      </div>
      <div style={{ position: 'fixed', bottom: 1, right: 10, zIndex: 99, userSelect: 'none' }} data-html2canvas-ignore>
        {svgStore.currentPage} / {svgStore.totalPage}
      </div>
    </div>
  )
})
