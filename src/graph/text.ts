import { TextOutput } from "../contant/svgOutput"
import { TextInput } from "../contant/svgInput"

export const textToSvg = (param: TextInput): TextOutput => {
  let { startX, startY, text, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  return { stroke, strokeWidth, fill, text, x: startX, y: startY + 5}
}

// 可能不需要 svgToText