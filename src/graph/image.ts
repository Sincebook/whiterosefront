import { ImageInput } from "../contant/svgInput"
import { ImageOutput } from "../contant/svgOutput"

export const imageToSvg = (param: ImageInput): ImageOutput => {
  const { x = 100, y = 100, xlinkHref  } = param
  return { x, y, xlinkHref }
}

export const svgToImage = (param: ImageOutput, x: number, y: number): ImageInput => {
  const { xlinkHref } = param
  return { x, y, xlinkHref }
}
