import { LineOutput } from "../contant/svgOutput"
import { LineInput } from "../contant/svgInput"

export const lineToSvg = (param: LineInput): LineOutput => {
  const { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  return { stroke, strokeWidth, fill, x1: startX, y1: startY, x2: x, y2: y}
}