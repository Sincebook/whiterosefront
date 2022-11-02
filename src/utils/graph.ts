import { Param, GraphInfo } from "../contant/svg";

const getLength = (point1, point2): number => {
  const { x: x1, y: y1 } = point1
  const { x: x2, y: y2 } = point2
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

const dealRect = (startX: number, startY: number, x: number, y: number) => {
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
  return { x: _x, y: _y, width: _width, height: _height }
}

export const locationToSvg = (param: Param ): GraphInfo => {
  const {startX, startY, x, y} = param
  const { type } = param.style
  switch (type) {
    case 'rect': {
      return {...param.style, ...dealRect(startX, startY, x, y)}
    }
    case 'roundedRect': {
      const { width, height } = dealRect(startX, startY, x, y)
      return { ...param.style, ...dealRect(startX, startY, x, y), rx: Math.min(width, height) / 10 }
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
    case 'arrow': {
      return {...param.style, x1: startX, y1: startY, x2: x, y2: y, markerEnd: 'url(#arrow)'}
    }
    case 'polyline': {
      const locations = param.style.locations
      let direct = param.style.direct
      if (locations.length === 0) {
        locations.push([startX, startY]) 
      }
      let [_x, _y] = [0, 0]
      if (locations.length === 1) {
        [_x, _y] = locations[locations.length - 1]
      } else {
        [_x, _y] = locations[locations.length - 2]
      }
      const offsetx = x - _x
      const offsety = y - _y
      const k = Math.abs(offsety) - Math.abs(offsetx)
      console.log(offsetx, offsety, k, direct);
      if (offsetx > 0 && k < 0) {
        if (direct === '') {
          direct = 'right'  
          locations.push([x, locations[locations.length - 1][1]])
        }
        else if (direct === 'right') {
          locations[locations.length - 1] = [x, locations[locations.length - 1][1]]
        } else {
          direct = 'right'
          locations.push([x, locations[locations.length - 1][1]])
        }
      } else if (offsety < 0 && k > 0) {
        if (direct === '') {
          direct = 'down'
          locations.push([locations[locations.length - 1][0], y])
        }
        else if (direct === 'down') {
          locations[locations.length - 1] = [locations[locations.length - 1][0], y]
        } else {
          direct = 'down'
          locations.push([locations[locations.length - 1][0], y])
        }
      } else if (offsetx < 0 && k < 0) {
        if (direct === '') {
          direct = 'left'
          locations.push([x, locations[locations.length - 1][1]])
        }
        else if (direct === 'left') {
          locations[locations.length - 1] = [x, locations[locations.length - 1][1]]
        } else {
          direct = 'left'
          locations.push([x, locations[locations.length - 1][1]])
        }
      } else if (offsety > 0 && k > 0) {
        if (direct === '') {
          direct = 'up'
          locations.push([locations[locations.length - 1][0], y])
        }
        else if (direct === 'up') {
          locations[locations.length - 1] = [locations[locations.length - 1][0], y]
        } else {
          direct = 'up'
          locations.push([locations[locations.length - 1][0], y])
        }
      }
      let points = ''
      locations.forEach(item => {
        points += `${item[0]},${item[1]} `
      })
      return { ...param.style, points, locations, direct, markerEnd: 'url(#arrow)' }
    }
    case 'diamond': {
      
    }
  }
}