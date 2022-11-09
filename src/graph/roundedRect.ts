import { RoundedRectOutput } from "../contant/svgOutput"
import { RoundedRectInput } from "../contant/svgInput"

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

export const roundedRectToSvg = (param: RoundedRectInput): RoundedRectOutput => {
  const { startX, startY, x, y, stroke = "#000000", strokeWidth = 3, fill = "none" } = param
  const { width, height } = dealRect(startX, startY, x, y)
  return { stroke, strokeWidth, fill, ...dealRect(startX, startY, x, y), rx: Math.min(width, height) / 10, startX, startY }
}

export const svgToRoundedRect = (param: RoundedRectOutput, x: number, y: number): RoundedRectInput => {
  const { stroke = "#000000", strokeWidth = 3, fill = "none", startX, startY } = param
  return { stroke, strokeWidth, fill, x, y, startX, startY }
}