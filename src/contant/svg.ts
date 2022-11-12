import { ArrowInput, CircleInput, DiamondInput, EllipseInput, LineInput, PathInput, PolylineInput, RectInput, RoundedRectInput, TextInput, TextPathInput, TriangleInput } from "./svgInput"
import { ArrowOutput, CircleOutput, DiamondOutput, EllipseOutput, ImageOutput, LineOutput, PathOutput, PolylineOutput, RectOutput, RoundedRectOutput, TextOutput, TextPathOutput, TriangleOutput } from "./svgOutput"

export interface SvgData {
  id: number
  status: number
  roomId: number
  svg: string
}

export interface SvgInput {
  id: number
  path?: PathInput[]
  arrow?: ArrowInput[]
  circle?: CircleInput[]
  diamond?: DiamondInput[]
  ellipse?: EllipseInput[]
  line?: LineInput[]
  polyline?: PolylineInput[]
  rect?: RectInput[]
  roundedRect?: RoundedRectInput[]
  text?: TextInput[]
  textpath?: TextPathInput[]
  triangle?: TriangleInput[]
}

export interface SvgOutput {
  id: number
  path?: Map<string, PathOutput>
  arrow?: Map<string, ArrowOutput>
  circle?: Map<string, CircleOutput>
  diamond?: Map<string, DiamondOutput>
  ellipse?: Map<string, EllipseOutput>
  line?: Map<string, LineOutput>
  polyline?: Map<string, PolylineOutput>
  rect?: Map<string, RectOutput>
  roundedRect?: Map<string, RoundedRectOutput>
  text?: Map<string, TextOutput>
  textpath?: Map<string, TextPathOutput>
  triangle?: Map<string, TriangleOutput>
  image?: Map<string, ImageOutput>
}
