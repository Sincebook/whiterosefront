export enum OpMap {
  page = 11,
  graph = 12,
  addPath = 100,
  drawPath = 101,
  addRect = 102,
  drawRect = 103,
  addArrow = 104,
  drawArrow = 105,
  addText = 106,
  drawText = 107,
  addCircle = 108,
  drawCircle = 109,
  addDiamond = 110,
  drawDiamond = 111,
  addEllipse = 112,
  drawEllipse = 113,
  addTriangle = 114,
  drawTriangle = 115,
  addPolyline = 116,
  drawPolyline = 117,
  addLine = 118,
  drawLine = 119,
  addRoundedRect = 120,
  drawRoundedRect = 121,
  lastPage = 301,
  nextPage = 302,
  addPage = 303,
  deletePage = 304,
  addGraph = 401,
  changeGraph = 402
}

export interface Op {
  type: number // 
  graph?: {
    op: number // 添加、旋转、缩放、平移
    type?: string // 图形类别
    key?: string // 图形所对应的key
    page?: number // 图形所对应的页面
    content?: any // 图形内容
  }
  page?: {
    op: number
    key?: number
    content?: any
  }
}

export enum MesMap {
  register = 0,
  upload = 101,
  common = 201,
  page = 202,
  pushOp = 203,
  unDo = 204,
  reDo = 205
}
