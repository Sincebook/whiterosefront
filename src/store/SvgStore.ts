import { message, } from "antd"
import { action, get, makeAutoObservable, observable } from "mobx"
import { createContext, useId } from "react"
import { SvgInput, SvgOutput } from "../contant/svg"
import type { GraphMask } from "../contant/svg"
import type { PathInput, RectInput, ArrowInput, TextInput, CircleInput, DiamondInput, EllipseInput, TriangleInput, PolylineInput, RoundedRectInput, TextPathInput, LineInput, ImageInput } from "../contant/svgInput";
import { pathToSvg, svgToPath } from "../graph/path"
import { rectToSvg, svgToRect } from "../graph/rect"
import { arrowToSvg, svgToArrow } from "../graph/arrow"
import { textToSvg, svgToText } from "../graph/text"
import { circleToSvg, svgToCircle } from "../graph/circle"
import { diamondToSvg, svgToDiamond } from "../graph/diamond"
import { ellipseToSvg, svgToEllipse } from "../graph/ellipse"
import { triangleToSvg, svgToTriangle } from "../graph/triangle"
import { polylineToSvg, svgToPolyline } from "../graph/polyline"
import { roundedRectToSvg, svgToRoundedRect } from "../graph/roundedRect"
import { textpathToSvg, svgToTextPath } from "../graph/textpath"
import { lineToSvg, svgToLine } from "../graph/line"
import { mesHandle } from "../utils/mesHandle"
import type { Op } from "../contant/options"
import { OpMap, MesMap } from "../contant/options"
import { imageToSvg, svgToImage } from "../graph/image"
import { calcAngle } from "../utils/calcAngle"

class SvgStore {
  // 图形svg
  @observable svg: SvgOutput[] = [{
    id: 1,
    path: new Map(),
    rect: new Map(),
    arrow: new Map(),
    text: new Map(),
    circle: new Map(),
    diamond: new Map(),
    ellipse: new Map(),
    triangle: new Map(),
    polyline: new Map(),
    roundedRect: new Map(),
    textpath: new Map(),
    line: new Map(),
    image: new Map()
  }]
  @observable doOptions: Op[] = [] // 操作栈
  @observable reDoOptions: Op[] = [] // 缓存栈
  @observable currentPage: number = 1
  @observable totalPage: number = 1
  @observable id = 1
  @observable currentId = 1
  @observable key = new Map()
  @observable strokeWidth = 3
  @observable imgSrc = []
  @observable svgType = '' // 当前用户操作类别
  @observable currentUid = localStorage.getItem('userId')
  @observable graphMask: GraphMask = { width: 0, height: 0, x: -100, y: -100 }
  @observable changeStart = [0, 0]
  @observable action: number = 0 // 当前动作: 旋转、平移、缩放
  @observable isLock: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound
  addSvg() {
    this.svg.push({ id: this.id + 1, path: new Map(), rect: new Map(), arrow: new Map(), text: new Map(), circle: new Map(), diamond: new Map(), ellipse: new Map(), triangle: new Map(), polyline: new Map(), roundedRect: new Map(), textpath: new Map(), line: new Map(), image: new Map() })
    this.id++
    this.totalPage++
    message.success('创建成功')
  }

  @action.bound
  deleteSvg() {
    if (this.totalPage === 1) {
      message.warning('就这一张了，别删除了～')
    } else {
      this.svg = this.svg.filter(item => item.id !== this.currentId)
        if (this.currentPage === 1) {
          this.totalPage--
          this.currentId = this.svg[0].id
        } else {
          this.currentId = this.svg[this.currentPage - 2].id
          this.totalPage--
          this.currentPage--
        }
    }
  }

  @action.bound
  nextPage() {
    if (this.currentPage < this.totalPage) {
      this.currentId = this.svg[this.currentPage].id
      this.currentPage++
    } else {
      message.warning('不能再下一页了～')
    }
  }

  @action.bound
  lastPage() {
    if (this.currentPage > 1) {
      this.currentId = this.svg[this.currentPage - 2].id
      this.currentPage--
    } else {
      message.warning('不能再上一页了～')
    }
  }
  get getCurrentGraph() {
    return this.svg[this.currentPage - 1][this.svgType].get(this.key.get(this.currentUid))
  }
  // 添加操作记录
  @action.bound
  pushOp(op: Op, sendMessage?: any) {
    if (op.type === OpMap.graph) {
      op.graph.page = this.currentPage - 1
      op.graph.key = this.key.get(this.currentUid)
      op.graph.content = this.getCurrentGraph
      op.graph.type = this.svgType
      this.doOptions.push(op)
    }
    if (sendMessage) {
      op.graph.content = ''
      sendMessage(mesHandle(MesMap.pushOp, op))
    }
  }
  // 远程添加操作
  @action.bound
  remotePushOp(op: Op) {
    if (op.type === OpMap.graph) {
      const {page, type, key} = op.graph
      op.graph.content = this.svg[page][type].get(key)
      this.doOptions.push(op)
    }
  }
  get lastOption() {
    return this.doOptions[this.doOptions.length - 1]
  }
  // 撤销
  @action.bound
  unDo(sendMessage?: any) {
    if (!this.lastOption) {
      message.error('撤不动了～')
      return
    }
    if (this.lastOption.type === OpMap.graph) {
      const { type, op, key, page } = this.lastOption.graph
      if (op === OpMap.addGraph) {
        this.svg[page][type].delete(key)
      }
    }
    this.reDoOptions.push(this.lastOption)
    this.doOptions.pop()
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.unDo))
    }
  }
  get reOption() {
    return this.reDoOptions[this.reDoOptions.length - 1]
  }
  // 恢复
  @action.bound
  reDo(sendMessage?: any) {
    if (!this.reOption) {
      message.error('没有数据可以恢复了')
      return
    }
    if (this.reOption.type === OpMap.graph) {
      const { type, op, key, page, content } = this.reOption.graph
      if (op === OpMap.addGraph) {
        this.svg[page][type].set(key, content)
      }
    }
    this.doOptions.push(this.reOption)
    this.reDoOptions.pop()
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.reDo))
    }
  }
  // 标记当前操作的图形
  @action.bound
  setSvgType(e) {
    this.svgType = e
  }
  // 改变线宽
  @action.bound
  changeStrokeWidth(e) {
    this.strokeWidth = e
  }

  @action.bound
  clear(sendMessage?: any) {
    this.svg[this.currentPage - 1] = {
      id: 1,
      path: new Map(),
      rect: new Map(),
      arrow: new Map(),
      text: new Map(),
      circle: new Map(),
      diamond: new Map(),
      ellipse: new Map(),
      triangle: new Map(),
      polyline: new Map(),
      roundedRect: new Map(),
      textpath: new Map(),
      line: new Map(),
      image: new Map()
    }
    this.doOptions = []
    this.reDoOptions = []
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.clear))
    }
  }

  @action.bound
  lock(sendMessage?: any) {
    this.isLock = !this.isLock
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.lock))
    }
  }

  get getPath() {
    return this.svg[this.currentPage - 1].path
  }
  @action.bound
  addPath(path: PathInput, userId, sendMessage?: any) {
    if (path.key) {
      this.key.set(userId, path.key)
      this.getPath.set(path.key, pathToSvg(path))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getPath.set(key, pathToSvg(path))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addPath,
        data: {...path, key},
        fromId: localStorage.getItem('userId')
      }))
    }
  }
  @action.bound
  drawPath(xy, userId, sendMessage?: any) {
    if (!this.getPath.get(this.key.get(userId))) return
    this.getPath.set(this.key.get(userId), pathToSvg(svgToPath(this.getPath.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawPath,
        data: xy,
        fromId: userId
      }))
    }
  }

  get getRect() {
    return this.svg[this.currentPage - 1].rect
  }
  @action.bound
  addRect(rect: RectInput, userId, sendMessage?: any) {
    if (rect.key) {
      this.key.set(userId, rect.key) // key和userId关联
      this.getRect.set(rect.key, rectToSvg(rect)) // key和图形关联
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key) // key和userId关联
      this.getRect.set(key, rectToSvg(rect)) // key和图形关联
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addRect,
        data: {...rect, key},
        fromId: localStorage.getItem('userId')
      }))
    }

  }
  @action.bound
  drawRect(xy, userId, sendMessage?: any) {
    if (!this.getRect.get(this.key.get(userId))) return
    this.getRect.set(this.key.get(userId), rectToSvg(svgToRect(this.getRect.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawRect,
        data: xy,
        fromId: userId
      }))
    }
  }
  @action.bound
  rotateRect(xy, userId) {
    const { midx, midy } = this.getRect.get(this.key.get(userId))
    const deg = calcAngle(midx, midy, xy)
    const rotate = `rotate(${deg},${midx},${midy})`
    this.getRect.set(this.key.get(userId), {...this.getRect.get(this.key.get(userId)), transform: rotate})
  }
  @action.bound
  scaleRect(xy, userId, direct) {
    let { x, y, width, height } = this.getRect.get(this.key.get(userId))
    switch (direct) {
      case OpMap.zoomingGraphRB: 
        width = xy.x - x
        height = xy.y - y
        break
      case 'Rup': 
        height += (y - xy.y)
        width = xy.x - x
        y = xy.y
        break
      case 'Lup':
        height += (y - xy.y)
        width += (x - xy.x)
        x = xy.x
        y = xy.y
        break
      case 'Ldown':
        width += (x - xy.x)
        height = xy.y - y
        x = xy.x
        break
    }
    this.getRect.set(this.key.get(userId), { ...this.getRect.get(this.key.get(userId)), x, y, width, height })
  }
  @action.bound
  dropRect(xy, userId) {
    let { x, y } = this.getRect.get(this.key.get(userId))
    const { startX, startY } = xy
    let clientx = xy.x - startX
    let clienty = xy.y - startY
    x += clientx
    y += clienty
    this.getRect.set(this.key.get(userId), { ...this.getRect.get(this.key.get(userId)), x, y })
  }

  get getArrow() {
    return this.svg[this.currentPage - 1].arrow
  }
  @action.bound
  addArrow(arrow: ArrowInput, userId, sendMessage?: any) {
    if (arrow.key) {
      this.key.set(userId, arrow.key)
      this.getArrow.set(arrow.key, arrowToSvg(arrow))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getArrow.set(key, arrowToSvg(arrow))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addArrow,
        data: {...arrow, key},
        fromId: localStorage.getItem('userId')
      }))
    }
    
  }
  @action.bound
  drawArrow(xy, userId, sendMessage?: any) {
    if (!this.getArrow.get(this.key.get(userId))) return
    this.getArrow.set(this.key.get(userId), arrowToSvg(svgToArrow(this.getArrow.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawArrow,
        data: xy,
        fromId: userId
      }))
    }
  }

  get getText() {
    return this.svg[this.currentPage - 1].text
  }
  @action.bound
  addText(text: TextInput, userId, sendMessage?: any) {
    if (text.key) { 
      this.key.set(userId, text.key)
      this.getText.set(text.key, textToSvg(text))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getText.set(key, textToSvg(text))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addText,
        data: {...text, key},
        fromId: localStorage.getItem('userId')
      }))
    }
    
  }
  @action.bound
  drawText(xy, userId, sendMessage?: any) {
    if (!this.getText.get(this.key.get(userId))) return
    this.getText.set(this.key.get(userId), textToSvg(svgToText(this.getText.get(this.key.get(userId)), xy.x, xy.y, xy.text)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawText,
        data: xy,
        fromId: userId
      }))
    }
  }
  @action.bound
  dropText(xy, userId) {
    let { x, y } = this.getText.get(this.key.get(userId))
    const { startX, startY } = xy
    let clientx = xy.x - startX
    let clienty = xy.y - startY
    x += clientx
    y += clienty
    this.getText.set(this.key.get(userId), { ...this.getText.get(this.key.get(userId)), x, y })
  }

  get getCircle() {
    return this.svg[this.currentPage - 1].circle
  }
  @action.bound
  addCircle(circle: CircleInput, userId, sendMessage?: any) {
    if (circle.key) {
      this.key.set(userId, circle.key)
      this.getCircle.set(circle.key, circleToSvg(circle))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getCircle.set(key, circleToSvg(circle))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addCircle,
        data: {...circle, key},
        fromId: userId
      }))
    }
  }
  @action.bound
  drawCircle(xy, userId, sendMessage?: any) {
    if (!this.getCircle.get(this.key.get(userId))) return
    this.getCircle.set(this.key.get(userId), circleToSvg(svgToCircle(this.getCircle.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawCircle,
        data: xy,
        fromId: userId
      }))
    }
  }

  get getDiamond() {
    return this.svg[this.currentPage - 1].diamond
  }
  @action.bound
  addDiamond(diamond: DiamondInput, userId, sendMessage?: any) {
    if (diamond.key) {
      this.key.set(userId, diamond.key)
      this.getDiamond.set(diamond.key, diamondToSvg(diamond))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getDiamond.set(key, diamondToSvg(diamond))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addDiamond,
        data: {...diamond, key},
        fromId: userId
      }))
    }
  }
  @action.bound
  drawDiamond(xy, userId, sendMessage?: any) {
    if (!this.getDiamond.get(this.key.get(userId))) return
    this.getDiamond.set(this.key.get(userId), diamondToSvg(svgToDiamond(this.getDiamond.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawDiamond,
        data: xy,
        fromId: userId
      }))
    }
  }

  get getEllipse() {
    return this.svg[this.currentPage - 1].ellipse
  }
  @action.bound
  addEllipse(ellipse: EllipseInput, userId, sendMessage?: any) {
    if (ellipse.key) {
      this.key.set(userId, ellipse.key)
      this.getEllipse.set(ellipse.key, ellipseToSvg(ellipse))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getEllipse.set(key, ellipseToSvg(ellipse))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addEllipse,
        data: {...ellipse, key},
        fromId: userId
      }))
    }
  }
  @action.bound
  drawEllipse(xy, userId, sendMessage?: any) {
    if (!this.getEllipse.get(this.key.get(userId))) return
    this.getEllipse.set(this.key.get(userId), ellipseToSvg(svgToEllipse(this.getEllipse.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawEllipse,
        data: xy,
        fromId: userId
      }))
    }
  }

  get getTriangle() {
    return this.svg[this.currentPage - 1].triangle
  }
  @action.bound
  addTriangle(triangle: TriangleInput, userId, sendMessage?: any) {
    if (triangle.key) {
      this.key.set(userId, triangle.key)
      this.getTriangle.set(triangle.key, triangleToSvg(triangle))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getTriangle.set(key, triangleToSvg(triangle))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addTriangle,
        data: {...triangle, key},
        fromId: userId
      }))
    }
    
  }
  @action.bound
  drawTriangle(xy, userId, sendMessage?: any) {
    if (!this.getTriangle.get(this.key.get(userId))) return
    this.getTriangle.set(this.key.get(userId), triangleToSvg(svgToTriangle(this.getTriangle.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawTriangle,
        data: xy,
        fromId: userId
      }))
    }
  }

  get getPolyline() {
    return this.svg[this.currentPage - 1].polyline
  }
  @action.bound
  addPolyline(polyline: PolylineInput, userId, sendMessage?: any) {
    if (polyline.key) {
      this.key.set(userId, polyline.key)
      this.getPolyline.set(polyline.key, polylineToSvg(polyline))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getPolyline.set(key, polylineToSvg(polyline))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addPolyline,
        data: {...polyline, key},
        fromId: userId
      }))
    }
    
  }
  @action.bound
  drawPolyline(xy, userId, sendMessage?: any) {
    if (!this.getPolyline.get(this.key.get(userId))) return
    this.getPolyline.set(this.key.get(userId), polylineToSvg(svgToPolyline(this.getPolyline.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawPolyline,
        data: xy,
        fromId: userId
      }))
    }
  }

  get getRoundedRect() {
    return this.svg[this.currentPage - 1].roundedRect
  }
  @action.bound
  addRoundedRect(roundedRect: RoundedRectInput, userId, sendMessage?: any) {
    if (roundedRect.key) {
      this.key.set(userId, roundedRect.key)
      this.getRoundedRect.set(roundedRect.key, roundedRectToSvg(roundedRect))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getRoundedRect.set(key, roundedRectToSvg(roundedRect))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addRoundedRect,
        data: {...roundedRect, key},
        fromId: userId
      }))
    }
    
  }
  @action.bound
  drawRoundedRect(xy, userId, sendMessage?: any) {
    if (!this.getRoundedRect.get(this.key.get(userId))) return
    this.getRoundedRect.set(this.key.get(userId), roundedRectToSvg(svgToRoundedRect(this.getRoundedRect.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawRoundedRect,
        data: xy,
        fromId: userId
      }))
    }
  }

  // get getTextPath() {
  //   return this.svg[this.currentPage - 1].textpath
  // }
  // @action.bound
  // addTextpath(textpath: TextPathInput, userId, sendMessage?: any) {
  //   const key = Math.floor(Math.random() * 1000000).toString()
  //   this.key.set(userId, key)
  //   this.getTextPath.set(key, textpathToSvg(textpath))
  // }
  // @action.bound
  // drawTextpath(xy, userId, sendMessage?: any) {
  //   this.getTextPath.set(this.key.get(userId), textpathToSvg(svgToTextPath(this.getTextPath.get(this.key.get(userId)), xy.x, xy.y)))
  // }

  get getLine() {
    return this.svg[this.currentPage - 1].line
  }
  @action.bound
  addLine(line: LineInput, userId, sendMessage?: any) {
    if (line.key) {
      this.key.set(userId, line.key)
      this.getLine.set(line.key, lineToSvg(line))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getLine.set(key, lineToSvg(line))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addLine,
        data: {...line, key},
        fromId: userId
      }))
    }
    
  }
  @action.bound
  drawLine(xy, userId, sendMessage?: any) {
    if (!this.getLine.get(this.key.get(userId))) return
    this.getLine.set(this.key.get(userId), lineToSvg(svgToLine(this.getLine.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawLine,
        data: xy,
        fromId: userId
      }))
    }
  }
  
  get getImage() {
    return this.svg[this.currentPage - 1].image
  }
  @action.bound
  addImage(image: ImageInput, userId, sendMessage?: any) {
    if (image.key) {
      this.key.set(userId, image.key)
      this.getImage.set(image.key, imageToSvg(image))
    } else {
      const key = Math.floor(Math.random() * 1000000).toString()
      this.key.set(userId, key)
      this.getImage.set(key, imageToSvg(image))
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.addImage,
        data: {...image, key},
        fromId: userId
      }))
    }
  }
  @action.bound
  drawImage(xy, userId, sendMessage?: any) {
    if (!this.getImage.get(this.key.get(userId))) return
    this.getImage.set(this.key.get(userId), imageToSvg(svgToImage(this.getImage.get(this.key.get(userId)), xy.x, xy.y)))
    if (sendMessage) {
      sendMessage(mesHandle(MesMap.common,
      {
        type: OpMap.drawImage,
        data: xy,
        fromId: userId
      }))
    }
  }
  // 设置当前操作类型
  @action.bound
  setAction(e) {
    this.action = e
  }
  // 为图形添加mask
  @action.bound
  addMask() {
    const {width, height, x, y} = this.getCurrentGraph
    this.setMask({width, height, x, y})
  }
  @action.bound
  setMask(mask: GraphMask) {
    this.graphMask = mask
  }
  @action.bound
  addMove(e) {
    this.changeStart = [e.clientX, e.clientY]
  }
  @action.bound
  moving(e) {
    const x = e.clientX - this.changeStart[0] 
    const y = e.clientY - this.changeStart[1]
    this.dropRect({startX: this.changeStart[0], startY: this.changeStart[1], x: e.clientX, y: e.clientY}, this.currentUid)
    this.changeStart = [e.clientX, e.clientY]
    this.graphMask.x += x
    this.graphMask.y += y
  }
  @action.bound
  movEnd(e) {

  }
  @action.bound
  addZoom(e) {
    this.changeStart = [e.clientX, e.clientY]
  }
  @action.bound
  zooming(e) {
    // console.log(this.getCurrentGraph)
    if (this.action === OpMap.zoomingGraphRB) {
      this.scaleRect({x: e.clientX, y: e.clientY}, this.currentUid, OpMap.zoomingGraphRB)
      const x = e.clientX - this.changeStart[0] 
      const y = e.clientY - this.changeStart[1]
      this.changeStart = [e.clientX, e.clientY]
      this.graphMask.width += x
      this.graphMask.height += y
    }
  }
  @action.bound
  zoomEnd(e) {

  }
  @action.bound
  addRorate(e) {

  }
  @action.bound
  rorating(e) {

  }
  @action.bound
  roratEnd(e) {

  }
}

export default createContext(new SvgStore())
