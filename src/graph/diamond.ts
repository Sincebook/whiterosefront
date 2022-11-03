import { Param, GraphInfo } from "../contant/svg"

export const diamondToSvg = (param: Param): GraphInfo => {
  let { startX, startY, x, y } = param
  y = startY
  // let points = ''
  const offsetx = x - startX
  const offsety = y - startY
  const len = offsetx / 2
  let x1: number = (x + startX) / 2
  let y1: number = y + len / Math.sqrt(6)
  let y2: number = y - len / Math.sqrt(6)
  let d = `M${startX} ${startY} L${x1} ${y1}L${x} ${y}L${x1} ${y2}Z`
  return { ...param.style, d }
}