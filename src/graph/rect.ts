import { Param, GraphInfo } from "../contant/svg"

const dealRect = (startX: number, startY: number, x: number, y: number) => {
  let _x = startX
  let _y = startY
  let _width = x - startX
  let _height = y - startY
  if (x - startX < 0) { //处理终止点在起始点左侧
    _x = x
    _width = startX - x
  } 
  if (y - startY < 0) { //处理终止点在起始点上侧
    _y = y
    _height = startY - y
  }
  return { x: _x, y: _y, width: _width, height: _height }
}

export const rectToSvg = (param: Param): GraphInfo => {
  const { startX, startY, x, y } = param
  return {...param.style, ...dealRect(startX, startY, x, y)}
}