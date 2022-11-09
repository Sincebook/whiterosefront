import { RectOutput } from "../contant/svgOutput"
import { RectInput } from "../contant/svgInput"

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

export const rectToSvg = (param: RectInput): RectOutput => {
  const { startX, startY, x, y, stroke = "#000000", strokeWidth = 3, fill = "none" } = param
  return { stroke, strokeWidth, fill, ...dealRect(startX, startY, x, y), startX, startY}
}

export const svgToRect = (param: RectOutput, x: number, y: number): RectInput => {
  const { stroke = "#000000", strokeWidth = 3, fill = "none", startX, startY } = param
  return { stroke, strokeWidth, fill, x, y, startX, startY}
}
