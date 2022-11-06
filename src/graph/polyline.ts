import { PolylineOutput } from "../contant/svgOutput"
import { PolylineInput } from "../contant/svgInput"

export const polylineToSvg = (param: PolylineInput): PolylineOutput => {
  const { startX, startY, x, y, markerEnd, locations, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  let direct = param.direct
  if (locations.length === 0) {
    locations.push([startX, startY]) 
  }
  let [_x, _y] = [0, 0]
  // 转向依赖点
  if (locations.length === 1) {
    [_x, _y] = locations[locations.length - 1]
  } else {
    const [x1, y1] = locations[locations.length - 2]
    const [x2, y2] = locations[locations.length - 1]
    _x = (x1 + 2 * x2) / 3
    _y = (y1 + 2 * y2) / 3
  }
  const offsetx = x - _x
  const offsety = y - _y
  const k = offsety / offsetx
  console.log(offsetx, offsety, k, direct);
  // 判定转向
  if (offsetx > 0 && k > -1 && k < 1) {
    if (direct === '') {
      console.log(1);
      direct = 'right'  
      locations.push([x, locations[locations.length - 1][1]])
    }
    else if (direct === 'right') {
      locations[locations.length - 1] = [x, locations[locations.length - 1][1]]
    } else {
      direct = 'right'
      locations.push([x, locations[locations.length - 1][1]])
    }
  } else if (offsety > 0 && (k > 1 || k < -1)) {
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
  } else if (offsetx < 0 && k > -1 && k < 1) {
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
  } else if (offsety < 0 && (k > 1 || k < -1)) {
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
  return { stroke, strokeWidth, fill, points, locations, direct, markerEnd, startX, startY }
}

export const svgToPolyline = (param: PolylineOutput, x: number, y: number): PolylineInput => {
  const {stroke, strokeWidth, fill, locations, direct, markerEnd, startX, startY } = param
  return { stroke, strokeWidth, fill, startX, startY, x, y, markerEnd, locations, direct } 
}