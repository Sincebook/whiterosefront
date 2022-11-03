import { Param, GraphInfo } from "../contant/svg"

export const ellipseToSvg = (param: Param): GraphInfo => {
  const { startX, startY, x, y } = param
  const rx = Math.abs(x - startX) / 2
  const ry = Math.abs(y - startY)
  let cx = startX + rx
  const cy = startY
  if (x < startX) {
    cx = startX - rx
  }
  return {...param.style, cx, cy, rx, ry}
}