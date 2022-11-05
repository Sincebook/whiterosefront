import { PathOutput } from "../contant/svgOutput"
import { PathInput } from "../contant/svgInput"

export const pathToSvg = (param: PathInput): PathOutput => {
  const { startX, startY, x, y, stroke = "#00000", strokeWidth = 3, fill = "none" } = param
  let d = param.d
  if (d.length === 0) {
    d = `M ${startX} ${startY}`
  } else {
    d += ` Q ${x} ${y} ${x} ${y}`
  }
  return { stroke, strokeWidth, fill, d }
}