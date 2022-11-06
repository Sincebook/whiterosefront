import { ArrowOutput } from "../contant/svgOutput"
import { ArrowInput } from "../contant/svgInput"

export const arrowToSvg = (param: ArrowInput): ArrowOutput => {
  const { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none", markerEnd } = param
  return { stroke, strokeWidth, fill, x1: startX, y1: startY, x2: x, y2: y, markerEnd }
}

export const svgToArrow = (param: ArrowOutput, x: number, y: number): ArrowInput => {
  const { stroke, strokeWidth, fill, x1, y1, markerEnd } = param
  return { startX: x1, startY: y1, x, y, stroke, strokeWidth, fill, markerEnd }
}