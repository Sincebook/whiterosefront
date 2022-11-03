import { Param, GraphInfo } from "../contant/svg"

export const pathToSvg = (param: Param): GraphInfo => {
  const { startX, startY, x, y } = param
  let d = param.style.d
  if (d.length === 0) {
    d = `M ${startX} ${startY}`
  } else {
    d += ` Q ${x} ${y} ${x} ${y}`
  }
  return {...param.style, d}
}