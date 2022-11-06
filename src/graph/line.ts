import { LineOutput } from "../contant/svgOutput"
import { LineInput } from "../contant/svgInput"

export const lineToSvg = (param: LineInput): LineOutput => {
  const { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  return { stroke, strokeWidth, fill, x1: startX, y1: startY, x2: x, y2: y}
}

export const svgToLine = (param: LineOutput, x: number, y: number): LineInput => {
  const { stroke, strokeWidth, fill, x1: startX, y1: startY } = param
  return { startX, startY, x, y, stroke, strokeWidth, fill }
}