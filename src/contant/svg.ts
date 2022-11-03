export interface SvgData {
  id: number
  status: number
  roomId: number
  svg: string
}

export interface GraphInfo { 
  id?: string // 唯一标识
  type: string // 图形类型 eg: path rect circle ellipse line roundedRect arrow ployfill(折线) diamond(菱形)
  stroke: string // 线条颜色
  strokeWidth: number // 线条宽度
  fill?: string // 填充颜色
  d?: string // path的属性
  text?: string // 文本属性
  x?: number // 矩形的左侧位置
  y?: number // 矩形的顶端位置
  width?: number // 矩形的宽度
  height?: number // 矩形的高度
  cx?: number // 圆形的圆心x坐标
  cy?: number // 圆形的圆心y坐标
  rx?: number // 椭圆的水平半径
  ry?: number // 椭圆的垂直半径
  r?: number // 原型的半径
  x1?: number // 直线的开始的x坐标
  y1?: number // 直线的开始的y坐标
  x2?: number // 直线的末尾的x坐标
  y2?: number // 直线的末尾的y坐标
  points?: string // 折线的转折点坐标集合
  markerEnd?: string // 箭头
  locations?: Array<Array<number>>
  direct?: string
  xlink?: string
}

export interface Param {
  startX?: number // 起始点x坐标
  startY?: number // 起始点y坐标
  x?: number // 当前点x坐标
  y?: number // 当前点y坐标
  style: GraphInfo
}

export interface Arrow {

}

export interface Circle {

}

export interface Diamond {

}

export interface Ellipse {

}

export interface Line {

}

export interface Path {

}

export interface Polyline {

}

export interface Rect {

}

export interface RoundedRect {

}

export interface Text {

}

export interface TextPath {

}

export interface Svg {
  id: number
  paths?: Path[]
}