import './style.css'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from 'react';
import { locationToPath, PathInfo } from '../../utils/path';

export default function SvgPaint() {
  const { readyState, sendMessage } = useWebSocket('ws://81.68.190.125:9009/chat')

  const [mouse, setMouse] = useState('up')
  const [path, setPath] = useState(Array<PathInfo>)

  const handleMouseDown = () => {
    setMouse('down')
    const newPath = path.concat([{d: '', stroke:'black', strokeWidth: 3, fill: 'none'}])
    setPath(newPath)
  }

  const handleMouseMove = (e) => {
    if (mouse === 'down') {
      e.clientX
      path[path.length - 1].d = locationToPath({x: e.clientX, y: e.clientY}, path[path.length - 1].d)
      console.log(path)
    }
  }
  
  const handleMouseUp = () => {
    setMouse('up')
  }

  return (
    <div>
      <svg className="svg-paint xb" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        { path.map((item, index) => <path d={item.d} key={index} stroke={item.stroke} strokeWidth={item.strokeWidth} fill={item.fill}/>) }
      </svg>
    </div>
  )
}