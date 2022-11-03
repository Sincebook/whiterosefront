import { observer } from 'mobx-react';
import { useContext, useState } from 'react';
import OptionStore from '../../store/OptionStore';
import SvgStore from '../../store/SvgStore';
import { locationToPath, PathInfo } from '../../utils/path';

import './style.css'

export default observer(function SvgPaint() {

  const optionStore = useContext(OptionStore)
  const svgStore = useContext(SvgStore)

  // const [mouse, setMouse] = useState('up')
  // const [path, setPath] = useState(Array<PathInfo>)

  // const handleMouseDown = () => {
  //   setMouse('down')
  //   const newPath = path.concat([{d: '', stroke:'black', strokeWidth: 3, fill: 'none'}])
  //   setPath(newPath)
  // }

  // const handleMouseMove = (e) => {
  //   if (mouse === 'down') {
  //     path[path.length - 1].d = locationToPath({x: e.clientX, y: e.clientY}, path[path.length - 1].d)
  //   }
  // }
  
  // const handleMouseUp = () => {
  //   setMouse('up')
  // }

  return (
    <div>
      {
        svgStore.svg.map((item, index)=>
          <svg className={"svg-paint " + optionStore.bg} style={index === svgStore.currentPage - 1? {zIndex: 2}:{}} key={item.id}>
            {item.paths?.map(path =>
              <path style={path} />
            )}
        </svg>
      )}
      {/* <svg className={"svg-paint " + optionStore.bg} style={{zIndex:'2'}} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        { path.map((item, index) => <path d={item.d} key={index} stroke={item.stroke} strokeWidth={item.strokeWidth} fill={item.fill}/>) }
      </svg>
      <svg className={"svg-paint " + optionStore.bg}  onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        { path.map((item, index) => <path d={item.d} key={index} stroke={item.stroke} strokeWidth={item.strokeWidth} fill={item.fill}/>) }
      </svg> */}
      <div style={{position: 'fixed', bottom: 1, right: 10, zIndex: 99}}>
        {svgStore.currentPage} / {svgStore.totalPage}
      </div>
    </div>
  )
})
