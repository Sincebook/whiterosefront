import { TextOutput } from "../contant/svgOutput"
import { TextInput } from "../contant/svgInput"

export const textToSvg = (param: TextInput): TextOutput => {
  let { startX, startY, text, stroke = "#000000", strokeWidth = 1, fill = "none" } = param
  return { stroke, strokeWidth, fill, text, x: startX, y: startY}
}

// 可能不需要 svgToText
export const svgToText = (param: TextOutput, x: number, y: number, text: string): TextInput => {
  const { stroke, strokeWidth, fill } = param
  return { startX: x, startY: y + 5, text, stroke, strokeWidth, fill }
}