import { Param, GraphInfo } from "../contant/svg"

export const lineToSvg = (param: Param): GraphInfo => {
  const { startX, startY, x, y } = param
  return {...param.style, x1: startX, y1: startY, x2: x, y2: y}
}