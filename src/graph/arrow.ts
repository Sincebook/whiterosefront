import { ArrowOutput } from "../contant/svgOutput"
import { ArrowInput } from "../contant/svgInput"

export const arrowToSvg = (param: ArrowInput): ArrowOutput => {
  const { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none", markerEnd } = param
  return { stroke, strokeWidth, fill, x1: startX, y1: startY, x2: x, y2: y, markerEnd }
}