import { TriangleOutput } from "../contant/svgOutput"
import { TriangleInput } from "../contant/svgInput"

export const diamondToSvg = (param: TriangleInput): TriangleOutput => {
  let { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  let x1 = x
  let offsetx = x - startY
  let x2 = startX - offsetx
  let d = `M${startX} ${startY} L${x1} ${y}L${x2} ${y}Z`
  return { stroke, strokeWidth, fill, d }
}