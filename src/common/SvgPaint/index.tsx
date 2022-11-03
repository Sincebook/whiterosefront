import { observer } from 'mobx-react';
import { useContext, useState } from 'react';
import OptionStore from '../../store/OptionStore';
import { locationToPath, PathInfo } from '../../utils/path';

import './style.css'

export default observer(function SvgPaint() {

  const optionStore = useContext(OptionStore)

  const [mouse, setMouse] = useState('up')
  const [path, setPath] = useState(Array<PathInfo>)

  const handleMouseDown = () => {
    setMouse('down')
    const newPath = path.concat([{d: '', stroke:'black', strokeWidth: 3, fill: 'none'}])
    setPath(newPath)
  }

  const handleMouseMove = (e) => {
    if (mouse === 'down') {
      path[path.length - 1].d = locationToPath({x: e.clientX, y: e.clientY}, path[path.length - 1].d)
    }
  }
  
  const handleMouseUp = () => {
    setMouse('up')
  }

  return (
    <div>
      <svg className={"svg-paint " + optionStore.bg}  onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        { path.map((item, index) => <path d={item.d} key={index} stroke={item.stroke} strokeWidth={item.strokeWidth} fill={item.fill}/>) }
      </svg>
    </div>
  )
})
