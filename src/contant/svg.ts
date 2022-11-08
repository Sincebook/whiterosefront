import { ArrowInput, CircleInput, DiamondInput, EllipseInput, LineInput, PathInput, PolylineInput, RectInput, RoundedRectInput, TextInput, TextPathInput } from "./svgInput"
import { ArrowOutput, CircleOutput, DiamondOutput, EllipseOutput, LineOutput, PathOutput, PolylineOutput, RectOutput, RoundedRectOutput, TextOutput, TextPathOutput } from "./svgOutput"

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
}

export interface SvgOutput {
  id: number
  path?: Map<string, PathOutput>
  arrow?: Map<string, ArrowOutput>
  circle?: CircleOutput[]
  diamond?: DiamondOutput[]
  ellipse?: EllipseOutput[]
  line?: LineOutput[]
  polyline?: PolylineOutput[]
  rect?: Map<string, RectOutput>
  roundedRect?: RoundedRectOutput[]
  text?: Map<string, TextOutput>
  textpath?: TextPathOutput[]
}
