import { Param, GraphInfo } from "../contant/svg"

export const textToSvg = (param: Param): GraphInfo => {
  let { startX, startY, x, y } = param
  const text = param.style.text
  y += 5
  return {...param.style, text, x, y}
}