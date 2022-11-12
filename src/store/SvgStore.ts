import { message, } from "antd";
import { action, get, makeAutoObservable, observable } from "mobx";
import { createContext, useId } from "react";
import { SvgInput, SvgOutput } from "../contant/svg";
import type { PathInput, RectInput, ArrowInput, TextInput, CircleInput, DiamondInput, EllipseInput, TriangleInput, PolylineInput, RoundedRectInput, TextPathInput, LineInput } from "../contant/svgInput";
import { pathToSvg, svgToPath } from "../graph/path";
import { rectToSvg, svgToRect } from "../graph/rect";
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
import { mesHandle } from "../utils/mesHandle";
import type { Op } from "../contant/options";
import { OpMap, MesMap } from "../contant/options";

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
    line: new Map()
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

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound
  addSvg() {
    this.svg.push({ id: this.id + 1, path: new Map(), rect: new Map(), arrow: new Map(), text: new Map(), circle: new Map(), diamond: new Map(), ellipse: new Map(), triangle: new Map(), polyline: new Map(), roundedRect: new Map(), textpath: new Map(), line: new Map() })
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
    console.log(op)
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
      console.log(this.lastOption)
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
  get getPath() {
    return this.svg[this.currentPage - 1].path
  }
  @action.bound
  addPath(path: PathInput, userId, sendMessage?: any) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getPath.set(key, pathToSvg(path))
    if (sendMessage) {
      sendMessage(mesHandle(201,
      {
        type: 100,
        data: path,
        fromId: localStorage.getItem('userId')
      }))
    }
   
  }
  @action.bound
  drawPath(xy, userId) {
    this.getPath.set(this.key.get(userId), pathToSvg(svgToPath(this.getPath.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getRect() {
    return this.svg[this.currentPage - 1].rect
  }
  @action.bound
  addRect(rect: RectInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key) // key和userId关联
    this.getRect.set(key, rectToSvg(rect)) // key和图形关联
  }
  @action.bound
  drawRect(xy, userId) {
    this.getRect.set(this.key.get(userId), rectToSvg(svgToRect(this.getRect.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getArrow() {
    return this.svg[this.currentPage - 1].arrow
  }
  @action.bound
  addArrow(arrow: ArrowInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getArrow.set(key, arrowToSvg(arrow))
  }
  @action.bound
  drawArrow(xy, userId) {
    this.getArrow.set(this.key.get(userId), arrowToSvg(svgToArrow(this.getArrow.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getText() {
    return this.svg[this.currentPage - 1].text
  }
  @action.bound
  addText(text: TextInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getText.set(key, textToSvg(text))
  }
  @action.bound
  drawText(xy, userId) {
    this.getText.set(this.key.get(userId), textToSvg(svgToText(this.getText.get(this.key.get(userId)), xy.x, xy.y, xy.text)))
  }

  get getCircle() {
    return this.svg[this.currentPage - 1].circle
  }
  @action.bound
  addCircle(circle: CircleInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getCircle.set(key, circleToSvg(circle))
  }
  @action.bound
  drawCircle(xy, userId) {
    this.getCircle.set(this.key.get(userId), circleToSvg(svgToCircle(this.getCircle.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getDiamond() {
    return this.svg[this.currentPage - 1].diamond
  }
  @action.bound
  addDiamond(diamond: DiamondInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getDiamond.set(key, diamondToSvg(diamond))
  }
  @action.bound
  drawDiamond(xy, userId) {
    this.getDiamond.set(this.key.get(userId), diamondToSvg(svgToDiamond(this.getDiamond.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getEllipse() {
    return this.svg[this.currentPage - 1].ellipse
  }
  @action.bound
  addEllipse(ellipse: EllipseInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getEllipse.set(key, ellipseToSvg(ellipse))
  }
  @action.bound
  drawEllipse(xy, userId) {
    this.getEllipse.set(this.key.get(userId), ellipseToSvg(svgToEllipse(this.getEllipse.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getTriangle() {
    return this.svg[this.currentPage - 1].triangle
  }
  @action.bound
  addTriangle(triangle: TriangleInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getTriangle.set(key, triangleToSvg(triangle))
  }
  @action.bound
  drawTriangle(xy, userId) {
    this.getTriangle.set(this.key.get(userId), triangleToSvg(svgToTriangle(this.getTriangle.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getPolyline() {
    return this.svg[this.currentPage - 1].polyline
  }
  @action.bound
  addPolyline(polyline: PolylineInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getPolyline.set(key, polylineToSvg(polyline))
  }
  @action.bound
  drawPolyline(xy, userId) {
    this.getPolyline.set(this.key.get(userId), polylineToSvg(svgToPolyline(this.getPolyline.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getRoundedRect() {
    return this.svg[this.currentPage - 1].roundedRect
  }
  @action.bound
  addRoundedRect(roundedRect: RoundedRectInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getRoundedRect.set(key, roundedRectToSvg(roundedRect))
  }
  @action.bound
  drawRoundedRect(xy, userId) {
    this.getRoundedRect.set(this.key.get(userId), roundedRectToSvg(svgToRoundedRect(this.getRoundedRect.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getTextPath() {
    return this.svg[this.currentPage - 1].textpath
  }
  @action.bound
  addTextpath(textpath: TextPathInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getTextPath.set(key, textpathToSvg(textpath))
  }
  @action.bound
  drawTextpath(xy, userId) {
    this.getTextPath.set(this.key.get(userId), textpathToSvg(svgToTextPath(this.getTextPath.get(this.key.get(userId)), xy.x, xy.y)))
  }

  get getLine() {
    return this.svg[this.currentPage - 1].line
  }
  @action.bound
  addLine(line: LineInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getLine.set(key, lineToSvg(line))
  }
  @action.bound
  drawLine(xy, userId) {
    this.getLine.set(this.key.get(userId), lineToSvg(svgToLine(this.getLine.get(this.key.get(userId)), xy.x, xy.y)))
  }

  addImgSrc(src) {
    this.imgSrc.push(src)  
  }

}

export default createContext(new SvgStore())
