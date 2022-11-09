import { EllipseOutput } from "../contant/svgOutput"
import { EllipseInput } from "../contant/svgInput"

export const ellipseToSvg = (param: EllipseInput): EllipseOutput => {
  const { startX, startY, x, y, stroke = "#000000", strokeWidth = 3, fill = "none" } = param
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

export const svgToEllipse = (param: EllipseOutput, x: number, y: number): EllipseInput => {
  const { stroke = "#000000", strokeWidth = 3, fill = "none", startX, startY } = param
  return { startX, startY, x, y, stroke, strokeWidth, fill }
}