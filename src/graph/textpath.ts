import { TextPathOutput } from "../contant/svgOutput"
import { TextPathInput } from "../contant/svgInput"


export const textpathToSvg = (param: TextPathInput): TextPathOutput => {
  const { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none", text } = param
  let d = param.d
  if (d.length === 0) {
    d = `M ${startX} ${startY}`
  } else {
    d += ` Q ${x} ${y} ${x} ${y}`
  }
  let id = String(new Date().getTime())
  let xlink = '#' + id
  return { stroke, strokeWidth, fill, d, id, xlink, text, startX, startY }
}

export const svgToTextPath = (param: TextPathOutput, x: number, y: number): TextPathInput => {
  const { stroke = "#000000", strokeWidth = 3, fill = "none",  d, text, startX, startY } = param
  return { stroke, strokeWidth, fill, x, y, startX, startY, text, d }
}
