import { observer } from 'mobx-react';

import { useContext, useEffect, useState, useRef } from 'react';
import { wsUrl } from '../../config/ws_url';
import MouseStore from '../../store/PositionStore';
import OptionStore from '../../store/OptionStore';
import SvgStore from '../../store/SvgStore';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './style.css'
import { lastMesHandle, mesHandle } from '../../utils/mesHandle'
import { OpMap } from '../../contant/options';

export default observer(function SvgPaint() {

  const { sendMessage, readyState, lastMessage } = useWebSocket(wsUrl, { share: true })

  const userID = localStorage.getItem('userId')

  const inputRef = useRef(null)

  useEffect(() => {
    // 与服务端建立链接
    sendMessage(mesHandle(0))
  }, [])
  // 图形绘制信息协同
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
      } else if (mess.type === 108) {
        svgStore.addCircle(mess.data, mess.fromId)
      } else if (mess.type === 109) {
        svgStore.drawCircle(mess.data, mess.fromId)
      } else if (mess.type === 110) {
        svgStore.addDiamond(mess.data, mess.fromId)
      } else if (mess.type === 111) {
        svgStore.drawDiamond(mess.data, mess.fromId)
      } else if (mess.type === 112) {
        svgStore.addEllipse(mess.data, mess.fromId)
      } else if (mess.type === 113) {
        svgStore.drawEllipse(mess.data, mess.fromId)
      } else if (mess.type === 114) {
        svgStore.addTriangle(mess.data, mess.fromId)
      } else if (mess.type === 115) {
        svgStore.drawTriangle(mess.data, mess.fromId)
      } else if (mess.type === 116) {
        svgStore.addPolyline(mess.data, mess.fromId)
      } else if (mess.type === 117) {
        svgStore.drawPolyline(mess.data, mess.fromId)
      } else if (mess.type === 116) {
        svgStore.addPolyline(mess.data, mess.fromId)
      } else if (mess.type === 117) {
        svgStore.drawPolyline(mess.data, mess.fromId)
      } else if (mess.type === 118) {
        svgStore.addLine(mess.data, mess.fromId)
      } else if (mess.type === 119) {
        svgStore.drawLine(mess.data, mess.fromId)
      } else if (mess.type === 120) {
        svgStore.addRoundedRect(mess.data, mess.fromId)
      } else if (mess.type === 121) {
        svgStore.drawRoundedRect(mess.data, mess.fromId)
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
    if (optionStore.tool !== 'font-size') {
      setShowInput(false)
    }
    if (optionStore.tool === 'highlight') {
      svgStore.setSvgType('path')
      svgStore.addPath({ startX: mouseStore.x, startY: mouseStore.y, d: '', stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }, userID, sendMessage)
    } else if (optionStore.tool === 'border') {
      if (optionStore.choice === 'circle') {
        svgStore.addCircle({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }, userID)
        sendMessage(mesHandle(201,
          {
            type: 108,
            data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth },
            fromId: userID
          }))
      } else if (optionStore.choice === 'diamond') {
        svgStore.addDiamond({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth, d: '' }, userID)
        sendMessage(mesHandle(201,
          {
            type: 110,
            data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth, d: '' },
            fromId: userID
          }))
      } else if (optionStore.choice === 'ellipse') {
        svgStore.addEllipse({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth}, userID)
        sendMessage(mesHandle(201,
          {
            type: 112,
            data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth },
            fromId: userID
          }))
      } else if (optionStore.choice === 'triangle') {
        svgStore.addTriangle({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }, userID)
        sendMessage(mesHandle(201,
          {
            type: 114,
            data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth},
            fromId: userID
          }))
      } else if (optionStore.choice === 'roundedrect') {
        svgStore.addRoundedRect({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }, userID)
        sendMessage(mesHandle(201,
          {
            type: 120,
            data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth},
            fromId: userID
          }))
      } else {
        svgStore.addRect({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }, userID)
        sendMessage(mesHandle(201,
          {
            type: 102,
            data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth },
            fromId: userID
          }))
      }
    } else if (optionStore.tool === 'pull-request') {
      if (optionStore.choice === 'polyline') {
        svgStore.addPolyline({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth, locations: [], direct: '' }, userID)
        sendMessage(mesHandle(201,
        {
          type: 116,
          data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth, locations: [], direct: '' },
          fromId: userID
        }))
      } else if (optionStore.choice === 'line') {
        svgStore.addLine({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }, userID)
        sendMessage(mesHandle(201,
        {
          type: 118,
          data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth },
          fromId: userID
        }))
      } else {
        svgStore.addArrow({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }, userID)
        sendMessage(mesHandle(201,
        {
          type: 118,
          data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth },
          fromId: userID
        }))
      }
    } else if (optionStore.tool === 'font-size') {
      mouseStore.handleMouseDown(e)
      inputRef.current.value = ''
      setShowInput(true)
      inputRef.current.focus()
      svgStore.addText({ startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, text: '' }, userID)
      sendMessage(mesHandle(201,
      {
        type: 106,
        data: { startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color, text: '' },
        fromId: userID
      }))
    } 
    if (e.target.dataset.id === 'svg') {
      mouseStore.handleMouseDown(e)
      let x = e.target.style.x.length === 0 ? e.target.x.animVal.value : e.target.style.x
      let y = e.target.style.y.length === 0 ? e.target.y.animVal.value : e.target.style.y
      mouseStore.offsetLeft = Number(x)
      mouseStore.offsetTop = Number(y)
    }
  }

  const handleMouseMove = (e) => {
    if (mouseStore.mouseDown) {
      if (optionStore.tool === 'highlight') {
        svgStore.drawPath({ x: mouseStore.x, y: mouseStore.y }, userID)
        sendMessage(mesHandle(201,
        {
          type: 101,
          data: { x: mouseStore.x, y: mouseStore.y },
          fromId: userID
        }))
      } else if (optionStore.tool === 'border') {
        if (optionStore.choice === 'circle') {
          svgStore.drawCircle({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
            {
              type: 109,
              data: { x: mouseStore.x, y: mouseStore.y },
              fromId: userID
            }))
        } else if (optionStore.choice === 'diamond') {
          svgStore.drawDiamond({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
            {
              type: 111,
              data: { x: mouseStore.x, y: mouseStore.y },
              fromId: userID
            }))
        } else if (optionStore.choice === 'ellipse') {
          svgStore.drawEllipse({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
            {
              type: 113,
              data: { x: mouseStore.x, y: mouseStore.y },
              fromId: userID
            }))
        } else if (optionStore.choice === 'triangle') {
          svgStore.drawTriangle({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
            {
              type: 115,
              data: { x: mouseStore.x, y: mouseStore.y },
              fromId: userID
            }))
        } else if (optionStore.choice === 'roundedrect') {
          svgStore.drawRoundedRect({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
            {
              type: 121,
              data: { x: mouseStore.x, y: mouseStore.y },
              fromId: userID
            }))
        } else {
          svgStore.drawRect({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
            {
              type: 103,
              data: { x: mouseStore.x, y: mouseStore.y },
              fromId: userID
            }))
        }
      } else if (optionStore.tool === 'pull-request') {
        if (optionStore.choice === 'polyline') {
          svgStore.drawPolyline({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
          {
            type: 117,
            data: { x: mouseStore.x, y: mouseStore.y },
            fromId: userID
          }))
        } else if (optionStore.choice === 'line') {
          svgStore.drawPolyline({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
          {
            type: 119,
            data: { x: mouseStore.x, y: mouseStore.y },
            fromId: userID
          }))
        } else {
          svgStore.drawArrow({ x: mouseStore.x, y: mouseStore.y }, userID)
          sendMessage(mesHandle(201,
          {
            type: 105,
            data: { x: mouseStore.x, y: mouseStore.y },
            fromId: userID
          }))
        }
      }
      if (e.target.dataset.id === 'svg') {
        const x = mouseStore.x
        const y = mouseStore.y
        const startX = mouseStore.startX
        const startY = mouseStore.startY
        const offsetLeft = mouseStore.offsetLeft
        const offsetTop = mouseStore.offsetTop
        const nl = offsetLeft + (x - startX)
        const nt = offsetTop + (y - startY);
        e.target.style.x = nl;
        e.target.style.y = nt;
      }
    }
  }

  const handleMouseUp = () => {
    mouseStore.mouseUpAction()
    if (svgStore.svgType) {
      svgStore.pushOp({
        type: OpMap.graph,
        graph: {
          op: OpMap.addGraph
        }}, sendMessage)
      svgStore.setSvgType('')
    }
  }

  const inputChange = (e) => {
    if (mouseStore.mouseDown) {
      if (optionStore.tool === 'font-size') {
        svgStore.drawText({ x: mouseStore.startX, y: mouseStore.startY, text: e.target.value }, userID)
        sendMessage(mesHandle(201,
        {
          type: 107,
          data: { x: mouseStore.startX, y: mouseStore.startX, text: e.target.value },
          fromId: userID
        }))
      }
    }
  }
  const inputBlur = () => {
    setShowInput(false)
  }
  const handleGraph = (graphs) => {
    let res = []
    graphs.forEach((graph) => {
      res.push(graph)
    });
    return res
  }

  return (
    <div>
      <div className='svgPage'></div>
      <div>
        {
          svgStore.svg.map((item, index) =>
            <svg className={"svg-paint " + optionStore.bg} 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={index === svgStore.currentPage - 1 ? { zIndex: 2 } : {}} key={item.id}
            >
              {
                optionStore.tool === 'aim' ? (
                  <g>
                    <line stroke={'#000000'} strokeWidth={1} x1={mouseStore.x} y1={0} x2={mouseStore.x} y2={980} />
                    <line stroke={'#000000'} strokeWidth={1} x1={0} y1={mouseStore.y} x2={1920} y2={mouseStore.y}/>
                  </g> ) : ''
                
              }
              {handleGraph(item.path).map((path, index) =>
                <path d={path.d} stroke={path.stroke} strokeWidth={path.strokeWidth} key={index} fill={path.fill} strokeLinecap={'round'} />
              )}
              {handleGraph(item.rect)?.map((rect, index) =>
                <rect key={index} width={rect.width} fill={rect.fill} height={rect.height} stroke={rect.stroke} strokeWidth={rect.strokeWidth} x={rect.x} y={rect.y}/>
              )}
              
              {handleGraph(item.arrow)?.map((arrow, index) =>
                <g key={index}>
                  <defs>
                    <marker id={arrow.id} markerUnits = "strokeWidth" markerWidth = "12" markerHeight = "12" viewBox = "0 0 12 12" refX = "6" refY = "6" orient = "auto" >
                      <path d="M2,2 L8,6 L2,10 L6,6 L2,2" fill={arrow.stroke} />
                    </marker>
                  </defs>
                  <line fill={arrow.fill} stroke={arrow.stroke} strokeWidth={arrow.strokeWidth} x1={arrow.x1} y1={arrow.y1} x2={arrow.x2} y2={arrow.y2} markerEnd={arrow.markerEnd} />
                </g>
              )}  
              {handleGraph(item.text)?.map((text, index) =>
                <text key={index} fill={text.fill} stroke={text.stroke} strokeWidth={text.strokeWidth} x={text.x} y={text.y} className="text">{text.text}</text>
              )}
              {handleGraph(item.circle)?.map((circle, index) =>
                <circle key={index} fill={circle.fill} stroke={circle.stroke} strokeWidth={circle.strokeWidth} r={circle.r} cx={circle.cx} cy={circle.cy} />
              )}
              {handleGraph(item.diamond)?.map((diamond, index) =>
                <path key={index} fill={diamond.fill} stroke={diamond.stroke} strokeWidth={diamond.strokeWidth} d={diamond.d} />
              )}
              {handleGraph(item.ellipse)?.map((ellipse, index) =>
                <ellipse key={index} fill={ellipse.fill} stroke={ellipse.stroke} strokeWidth={ellipse.strokeWidth} cx={ellipse.cx} cy={ellipse.cy} rx={ellipse.rx} ry={ellipse.ry} />
              )}
              {handleGraph(item.triangle)?.map((triangle, index) =>
                <path key={index} fill={triangle.fill} stroke={triangle.stroke} strokeWidth={triangle.strokeWidth} d={triangle.d} />
              )}
              {handleGraph(item.polyline)?.map((polyline, index) =>
                <g key={index}>
                  <defs>
                    <marker id={polyline.id} markerUnits = "strokeWidth" markerWidth = "12" markerHeight = "12" viewBox = "0 0 12 12" refX = "6" refY = "6" orient = "auto" >
                      <path d="M2,2 L8,6 L2,10 L6,6 L2,2" fill={polyline.stroke} />
                    </marker>
                  </defs>
                  <polyline fill={polyline.fill} stroke={polyline.stroke} strokeWidth={polyline.strokeWidth} points={polyline.points} markerEnd={polyline.markerEnd} />
                </g>
              )}
              {handleGraph(item.line)?.map((line, index) =>
                <line key={index} fill={line.fill} stroke={line.stroke} strokeWidth={line.strokeWidth} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}  />
              )}
              {handleGraph(item.roundedRect)?.map((roundedRect, index) =>
                <rect key={index} fill={roundedRect.fill} stroke={roundedRect.stroke} strokeWidth={roundedRect.strokeWidth} width={roundedRect.width} height={roundedRect.height} x={roundedRect.x} y={roundedRect.y} rx={roundedRect.rx} />
              )}
              {svgStore.imgSrc?.map((img, index) => 
                <image key={index} xlinkHref={img} x="100" y="100" height="100" width="200" className='svgImg' data-id="svg"/>
              )}
            </svg>
          )
        }
      </div>
      <div style={{ position: 'fixed', bottom: 1, right: 10, zIndex: 99, userSelect: 'none' }} data-html2canvas-ignore>
        {svgStore.currentPage} / {svgStore.totalPage}
      </div>
      <div>
        <input className='text-input' type="text" style={inputStyle} onChange={inputChange} ref={inputRef} onBlur={inputBlur} />
      </div>
    </div>
  )
})
