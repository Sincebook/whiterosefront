export interface CommonSvgInputData {
  x?: number // 当前鼠标位置x坐标
  y?: number // 当前鼠标位置y坐标
  startX?: number // 鼠标点击时x坐标
  startY?: number // 鼠标点击时y坐标
  stroke?: string // 线条颜色
  strokeWidth?: number // 线条宽度
  fill?: string // 填充颜色
}

export interface ArrowInput extends CommonSvgInputData{ // 箭头
  
}

export interface CircleInput extends CommonSvgInputData{

}

export interface DiamondInput extends CommonSvgInputData{
  d: string // 菱形的轨迹
}

export interface EllipseInput extends CommonSvgInputData {
  
}

export interface LineInput extends CommonSvgInputData {
  
}

export interface PathInput extends CommonSvgInputData {
  d: string // path的路径信息
}

export interface PolylineInput extends CommonSvgInputData {
  locations: Array<Array<number>> // 折线的转折点坐标数组集合
  direct: string // 折线方向
}

export interface RectInput extends CommonSvgInputData {

}

export interface RoundedRectInput extends CommonSvgInputData {

}

export interface TextInput extends CommonSvgInputData {
  text: string // 文字内容
}

export interface TextPathInput extends CommonSvgInputData {
  text: string // 文字内容
  d: string // path的路径信息
}

export interface TriangleInput extends CommonSvgInputData {

}

export interface ImageInput extends CommonSvgInputData {
  xlinkHref: string | ArrayBuffer // 图片地址
}