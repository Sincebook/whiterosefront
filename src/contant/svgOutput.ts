export interface CommonSvgOutputData {
  stroke?: string // 线条颜色
  strokeWidth?: number // 线条宽度
  fill?: string // 填充颜色
  startX?: number // 图形起始点x坐标
  startY?: number // 图形起始点y坐标
}

// <defs>
//   <marker id="arrow" markerUnits = "strokeWidth" markerWidth = "12" markerHeight = "12" viewBox = "0 0 12 12" refX = "6" refY = "6" orient = "auto" >
//     <path d="M2,2 L10,6 L2,10 L6,6 L2,2" fill = "#000000;" />
//   </marker>
// </defs>
export interface ArrowOutput extends CommonSvgOutputData{ // 箭头
  x1: number // 箭头起点的x坐标
  y1: number // 箭头起点的y坐标 
  x2: number // 箭头终点的x坐标
  y2: number // 箭头终点的y坐标
  markerEnd: string  // 指定直线末尾的元素（如上） eg: "#arrow"
}

export interface CircleOutput extends CommonSvgOutputData{
  cx: number // 圆形的圆心x坐标
  cy: number // 圆形的圆心y坐标
  r: number // 圆形的半径
}

export interface DiamondOutput extends CommonSvgOutputData{
  d: string // 菱形的轨迹
}

export interface EllipseOutput extends CommonSvgOutputData {
  cx: number // 椭圆的中心点x坐标
  cy: number // 椭圆的中心点y坐标
  rx: number // 椭圆的水平半径
  ry: number // 椭圆的垂直半径
}

export interface LineOutput extends CommonSvgOutputData {
  x1?: number // 直线起点的x坐标
  y1?: number // 直线起点的y坐标
  x2?: number // 直线终点的x坐标
  y2?: number // 直线终点的y坐标
}

export interface PathOutput extends CommonSvgOutputData {
  d: string // path的路径信息
}

export interface PolylineOutput extends CommonSvgOutputData {
  points: string //折线的转折点坐标集合
  locations: Array<Array<number>> // 折线的转折点坐标数组集合
  direct: string // 折线方向
  markerEnd: string // 末尾箭头，同arrow
}

export interface RectOutput extends CommonSvgOutputData {
  x: number // 矩形的左侧位置
  y: number // 矩形的顶端位置
  width: number // 矩形的宽度
  height: number // 矩形的高度
}

export interface RoundedRectOutput extends CommonSvgOutputData {
  x: number // 圆角矩形的左侧位置
  y: number // 圆角矩形的顶端位置
  width: number // 圆角矩形的宽度
  height: number // 圆角矩形的高度
  rx: number // 圆角矩形的圆角弧度 相对于width。默认ry = rx
}

export interface TextOutput extends CommonSvgOutputData {
  x: number // 文字的位置x坐标
  y: number // 文字的位置y坐标
  text: string // 文字内容
}

export interface TextPathOutput extends CommonSvgOutputData {
  text: string // 文字内容
  d: string // path的路径信息
  xlink: string // 用在textPath元素上，表示依赖的path，内容为 "#" + path的id
  id: string // 依赖的path的id
}

export interface TriangleOutput extends CommonSvgOutputData {
  d: string // 三角形的路径信息
}

export interface ImageOutput extends CommonSvgOutputData {
  xlinkHref: string // 图片地址
  height: number // 图片高度
  width: number  // 图片宽度 
  x: number // 图片位置x坐标
  y: number // 图片位置y坐标
}
