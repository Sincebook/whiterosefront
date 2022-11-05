import { EllipseOutput } from "../contant/svgOutput"
import { EllipseInput } from "../contant/svgInput"

export const ellipseToSvg = (param: EllipseInput): EllipseOutput => {
  const { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  const rx = Math.abs(x - startX) / 2
  const ry = Math.abs(y - startY) / 2
  let cx = startX + rx
  let cy = startY + ry
  if (x < startX) {
    cx = startX - rx
  }
  if (y < startY) {
    cy = startY - ry
  }
  return { stroke, strokeWidth, fill, cx, cy, rx, ry }
}