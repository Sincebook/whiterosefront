import { ArrowOutput } from "../contant/svgOutput"
import { ArrowInput } from "../contant/svgInput"

export const arrowToSvg = (param: ArrowInput): ArrowOutput => {
  const { startX, startY, x, y, stroke = "#000000", strokeWidth = 3, fill = "none" } = param
  const id = new Date().getTime() + Math.random() + Math.floor(Math.random() * 100000) - Math.floor(Math.random() * 100000)
  return { stroke, strokeWidth, fill, x1: startX, y1: startY, x2: x, y2: y, markerEnd: `url(#${id})`, id }
}

export const svgToArrow = (param: ArrowOutput, x: number, y: number): ArrowInput => {
  const { stroke = "#000000", strokeWidth = 3, fill = "none", x1, y1 } = param
  return { startX: x1, startY: y1, x, y, stroke, strokeWidth, fill }
}