import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useContext, useState } from 'react';
import MouseStore from '../../store/MouseStore';
import OptionStore from '../../store/OptionStore';
import SvgStore from '../../store/SvgStore';
import { locationToPath, PathInfo } from '../../utils/path';

import './style.css'

export default observer(function SvgPaint() {

  const optionStore = useContext(OptionStore)
  const svgStore = useContext(SvgStore)
  const mouseStore = useContext(MouseStore)
  

  const handleMouseDown = () => {
    mouseStore.mouseDownAciton()
    console.log(optionStore.tool)
    if (optionStore.tool === 'highlight') {
      svgStore.addPath({startX: mouseStore.x, startY: mouseStore.y, d: '', stroke: optionStore.color})
    } else if (optionStore.tool === 'border') {
      svgStore.addRect({startX: mouseStore.x, startY: mouseStore.y, x: mouseStore.x, y: mouseStore.y, stroke: optionStore.color})
    }
  }

  const handleMouseMove = () => {
    if (mouseStore.mouseDown) {
      if (optionStore.tool === 'highlight') {
        svgStore.drawPath(mouseStore.x, mouseStore.y)
      } else if (optionStore.tool === 'border') {
        svgStore.drawRect(mouseStore.x, mouseStore.y)
      }
    }
  }
  
  const handleMouseUp = () => {
    mouseStore.mouseUpAction()
  }

  return (
    <div>
      {
        svgStore.svg.map((item, index)=>
          <svg className={"svg-paint " + optionStore.bg} 
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={index === svgStore.currentPage - 1? {zIndex: 2}:{}} key={item.id}>
            {item.path?.map((path, index) =>
              <path d={path.d} stroke={path.stroke} strokeWidth={path.strokeWidth} key={index} fill={path.fill} />
            )}
            {item.rect?.map((rect, index) => 
              <rect key={index} width={rect.width} fill={rect.fill} height={rect.height} stroke={rect.stroke} strokeWidth={rect.strokeWidth} x={rect.x} y={rect.y} />
            )}
        </svg>
      )}
      <div style={{position: 'fixed', bottom: 1, right: 10, zIndex: 99}}>
        {svgStore.currentPage} / {svgStore.totalPage}
      </div>
    </div>
  )
})
