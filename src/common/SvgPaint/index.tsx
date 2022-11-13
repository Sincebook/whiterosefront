import { observer } from 'mobx-react';

import { useContext, useEffect, useState, useRef } from 'react';
import { wsUrl } from '../../config/ws_url';
import MouseStore from '../../store/PositionStore';
import OptionStore from '../../store/OptionStore';
import SvgStore from '../../store/SvgStore';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './style.css'
import { lastMesHandle, mesHandle } from '../../utils/mesHandle'
import { MesMap, OpMap } from '../../contant/options';

export default observer(function SvgPaint() {

  const { sendMessage, readyState, lastMessage } = useWebSocket(wsUrl, { share: true })

  const userID = localStorage.getItem('userId')

  const inputRef = useRef(null)
  const rectRef = useRef(null)

  useEffect(() => {
    // 与服务端注册链接
    sendMessage(mesHandle(MesMap.register))
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
      } else if (mess.type === 118) {
        svgStore.addLine(mess.data, mess.fromId)
      } else if (mess.type === 119) {
        svgStore.drawLine(mess.data, mess.fromId)
      } else if (mess.type === 120) {
        svgStore.addRoundedRect(mess.data, mess.fromId)
      } else if (mess.type === 121) {
        svgStore.drawRoundedRect(mess.data, mess.fromId)
      } else if (mess.type === 123) {
        svgStore.drawImage(mess.data, mess.fromId)
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
    const common = { startX: mouseStore.x, startY: mouseStore.y, stroke: optionStore.color, strokeWidth: svgStore.strokeWidth }
    if (optionStore.tool === 'highlight') {
      svgStore.setSvgType('path')
      svgStore.addPath({...common, d: ''}, userID, sendMessage)
    } else if (optionStore.tool === 'border') {
      if (optionStore.choice === 'circle') {
        svgStore.setSvgType('circle')
        svgStore.addCircle({ ...common, x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      } else if (optionStore.choice === 'diamond') {
        svgStore.setSvgType('diamond')
        svgStore.addDiamond({...common, d: '', x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      } else if (optionStore.choice === 'ellipse') {
        svgStore.setSvgType('ellipse')
        svgStore.addEllipse({ ...common, x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      } else if (optionStore.choice === 'triangle') {
        svgStore.setSvgType('triangle')
        svgStore.addTriangle({ ...common, x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      } else if (optionStore.choice === 'roundedrect') {
        svgStore.setSvgType('roundedRect')
        svgStore.addRoundedRect({ ...common, x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      } else {
        svgStore.setSvgType('rect')
        svgStore.addRect({ ...common, x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      }
    } else if (optionStore.tool === 'pull-request') {
      if (optionStore.choice === 'polyline') {
        svgStore.setSvgType('polyline')
        svgStore.addPolyline({ ...common, locations: [], direct: '' }, userID, sendMessage)
      } else if (optionStore.choice === 'line') {
        svgStore.setSvgType('line')
        svgStore.addLine({ ...common, x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      } else {
        svgStore.setSvgType('arrow')
        svgStore.addArrow({ ...common, x: mouseStore.x, y: mouseStore.y }, userID, sendMessage)
      }
    } else if (optionStore.tool === 'font-size') {
      mouseStore.handleMouseDown(e)
      inputRef.current.value = ''
      setShowInput(true)
      inputRef.current.focus()
      svgStore.setSvgType('text')
      svgStore.addText({ ...common, text: '' }, userID, sendMessage)
    } else if (optionStore.tool === 'aim') {
      if (optionStore.choice === 'drag') {
        if (e.target.dataset.id === 'svg') {
          mouseStore.handleMouseDown(e)
          const animValX = e.target.x.animVal[0] ? e.target.x.animVal[0].value : e.target.x.animVal.value
          const animValY = e.target.y.animVal[0] ? e.target.y.animVal[0].value : e.target.y.animVal.value
          let x = e.target.style.x.length === 0 ? animValX : e.target.style.x
          let y = e.target.style.y.length === 0 ? animValY : e.target.style.y
          mouseStore.offsetLeft = Number(x)
          mouseStore.offsetTop = Number(y)          
        }
      }
    }
    
  }

  const handleMouseMove = (e) => {
    const drawCommon = { x: mouseStore.x, y: mouseStore.y }
    if (mouseStore.mouseDown) {
      if (optionStore.tool === 'highlight') {
        svgStore.drawPath(drawCommon, userID, sendMessage)
      } else if (optionStore.tool === 'border') {
        if (optionStore.choice === 'circle') {
          svgStore.drawCircle(drawCommon, userID, sendMessage)
        } else if (optionStore.choice === 'diamond') {
          svgStore.drawDiamond(drawCommon, userID, sendMessage)
        } else if (optionStore.choice === 'ellipse') {
          svgStore.drawEllipse(drawCommon, userID, sendMessage)
        } else if (optionStore.choice === 'triangle') {
          svgStore.drawTriangle(drawCommon, userID, sendMessage)
        } else if (optionStore.choice === 'roundedrect') {
          svgStore.drawRoundedRect(drawCommon, userID, sendMessage)
        } else {
          svgStore.drawRect(drawCommon, userID, sendMessage)
        }
      } else if (optionStore.tool === 'pull-request') {
        if (optionStore.choice === 'polyline') {
          svgStore.drawPolyline(drawCommon, userID, sendMessage)
        } else if (optionStore.choice === 'line') {
          svgStore.drawLine(drawCommon, userID, sendMessage)
        } else {
          svgStore.drawArrow(drawCommon, userID, sendMessage)
        }
      }
      if (optionStore.tool === 'aim') {
        if (optionStore.choice === 'drag') {
          if (e.target.dataset.id === 'svg') {
            const x = mouseStore.x
            const y = mouseStore.y
            const startX = mouseStore.startX
            const startY = mouseStore.startY
            const offsetLeft = mouseStore.offsetLeft
            const offsetTop = mouseStore.offsetTop
            const nl = offsetLeft + (x - startX)
            const nt = offsetTop + (y - startY)
            svgStore.drawImage({ x: nl, y: nt }, userID, sendMessage)
          }
        }
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
                (optionStore.tool === 'aim' && optionStore.choice === 'position') ? (
                  <g>
                    <line stroke={'#000000'} strokeWidth={1} x1={mouseStore.x} y1={0} x2={mouseStore.x} y2={mouseStore.clientHeight} />
                    <line stroke={'#000000'} strokeWidth={1} x1={0} y1={mouseStore.y} x2={mouseStore.clientWidth} y2={mouseStore.y}/>
                  </g> ) : ''
                
              }
              {handleGraph(item.path).map((path, index) =>
                <path d={path.d} stroke={path.stroke} strokeWidth={path.strokeWidth} key={index} fill={path.fill} strokeLinecap={'round'} />
              )}
              {handleGraph(item.rect)?.map((rect, index) =>
                <rect key={index} width={rect.width} fill={rect.fill} height={rect.height} stroke={rect.stroke} strokeWidth={rect.strokeWidth} x={rect.x} y={rect.y} data-id="svg"/>
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
              {handleGraph(item.image)?.map((img, index) => 
                <image key={index} xlinkHref={img.xlinkHref} x={img.x} y={img.y} height="100" width="200" className='svgImg' data-id="svg"/>
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
