import { DiamondOutput } from "../contant/svgOutput"
import { DiamondInput } from "../contant/svgInput"

export const diamondToSvg = (param: DiamondInput): DiamondOutput => {
  let { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  y = startY
  const offsetx = x - startX
  const len = offsetx / 2
  let x1: number = (x + startX) / 2
  let y1: number = y + len / Math.sqrt(6)
  let y2: number = y - len / Math.sqrt(6)
  let d = `M${startX} ${startY} L${x1} ${y1}L${x} ${y}L${x1} ${y2}Z`
  return { stroke, strokeWidth, fill, d, startX, startY }
}

export const svgToDiamond = (param: DiamondOutput, x: number, y: number): DiamondInput => {
  const { stroke, strokeWidth, fill, d, startX, startY } = param
  return { startX, startY, x, y, stroke, strokeWidth, fill, d }
}