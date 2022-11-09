import { CircleOutput } from "../contant/svgOutput"
import { CircleInput } from "../contant/svgInput"

const getLength = (point1, point2): number => {
  const { x: x1, y: y1 } = point1
  const { x: x2, y: y2 } = point2
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export const circleToSvg = (param: CircleInput): CircleOutput => {
  const { startX, startY, x, y, stroke = "#000000", strokeWidth = 3, fill = "none" } = param
  const point1 = { x: startX, y: startY }
  const point2 = { x, y }
  const r = getLength(point1, point2) / 2
  const cx = (x + startX) / 2
  const cy = (y + startY) / 2
  return { stroke, strokeWidth, fill, cx, cy, r, startX, startY }
}

export const svgToCircle = (param: CircleOutput, x: number, y: number): CircleInput => {
  const { stroke = "#000000", strokeWidth = 3, fill = "none", startX, startY } = param
  return { startX, startY, x, y, stroke, strokeWidth, fill }
}