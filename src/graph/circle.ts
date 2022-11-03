import { Param, GraphInfo } from "../contant/svg"

const getLength = (point1, point2): number => {
  const { x: x1, y: y1 } = point1
  const { x: x2, y: y2 } = point2
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export const circleToSvg = (param: Param): GraphInfo => {
  const { startX, startY, x, y } = param
  const point1 = { x: startX, y: startY }
  const point2 = { x, y }
  const r = getLength(point1, point2) / 2
  const cx = (x + startX) / 2
  const cy = (y + startY) / 2
  return {...param.style, cx, cy, r}
}