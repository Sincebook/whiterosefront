import { Param, GraphInfo } from "../contant/svg";

const getLength = (point1, point2): number => {
  const { x: x1, y: y1 } = point1
  const { x: x2, y: y2 } = point2
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export const locationToSvg = (param: Param ): GraphInfo => {
  const {startX, startY, x, y} = param
  const { type } = param.style
  switch (type) {
    case 'rect': {
      let _x = startX
      let _y = startY
      let _width = x - startX
      let _height = y - startY
      if (x - startX < 0) { //处理终止点在起始点左侧
        _x = x
        _width = startX - x
      } 
      if (y - startY < 0) { //处理终止点在起始点上侧
        _y = y
        _height = startY - y
      }
      return {...param.style, x: _x, y: _y, width: _width, height: _height}
    }
    case 'path': {
      let d = param.style.d
      if (d.length === 0) {
        d = `M ${startX} ${startY}`
      } else {
        d += ` Q ${x} ${y} ${x} ${y}`
      }
      return {...param.style, d}
    }
    case 'circle': {
      const point1 = { x: startX, y: startY }
      const point2 = { x, y }
      const r = getLength(point1, point2) / 2
      const cx = (x + startX) / 2
      const cy = (y + startY) / 2
      return {...param.style, cx, cy, r}
    }
    case 'ellipse': {
      const rx = Math.abs(x - startX) / 2
      const ry = Math.abs(y - startY)
      let cx = startX + rx
      const cy = startY
      if (x < startX) {
        cx = startX - rx
      }
      return {...param.style, cx, cy, rx, ry}
    }
    case 'line': {
      return {...param.style, x1: startX, y1: startY, x2: x, y2: y}
    }
  }
}