import { ImageInput } from "../contant/svgInput"
import { ImageOutput } from "../contant/svgOutput"

export const imageToSvg = (param: ImageInput): ImageOutput => {
  const { startX, startY, xlinkHref, width = 100, height = 100 } = param
  return { x: startX, y: startY, width, height, xlinkHref }
}

// 不确定是否需要该函数
export const svgToImage = (param: ImageOutput, x: number, y: number): ImageInput => {
  const { x: startX, y: startY, width, height, xlinkHref } = param
  return { startX, startY, xlinkHref, width, height }
}

// <svg id="svg1" width="600" height="600" viewBox="0 0 600 600"
//      xmlns="http://www.w3.org/2000/svg" 
//      xmlns:xlink="http://www.w3.org/1999/xlink">       
//   <image xlink:href="http://img.alicdn.com/tps/i4/TB1sLIsGXXXXXb6XFXX1aiKJFXX-4-7.png" x="0" y="0" height="100" width="100" />    
// </svg>