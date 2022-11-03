import { Param, GraphInfo } from "../contant/svg"

export const textpathToSvg = (param: Param): GraphInfo => {
  const { startX, startY, x, y } = param
  let d = param.style.d
  if (d.length === 0) {
    d = `M ${startX} ${startY}`
  } else {
    d += ` Q ${x} ${y} ${x} ${y}`
  }
  let id = String(new Date().getTime())
  let xlink = '#' + id
  return {...param.style, d, id, xlink}
}