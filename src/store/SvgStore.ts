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
class SvgStore {
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
    textpath: new Map()
  }]
  @observable currentPage: number = 1
  @observable totalPage: number = 1
  @observable id = 1
  @observable currentId = 1
  @observable key = new Map()
  @observable strokeWidth = 3

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound
  addSvg() {
    this.svg.push({ id: this.id + 1, path: new Map(), rect: new Map(), arrow: new Map(), text: new Map(), circle: new Map(), diamond: new Map(), ellipse: new Map(), triangle: new Map(), polyline: new Map(), roundedRect: new Map(), textpath: new Map() })
    this.id++
    this.totalPage++
    message.success('创建成功')
  }

  @action.bound
  deleteSvg() {
    if (this.totalPage === 1) {
      message.warning('就这一张了，别删除了～')
    } else {
      if (confirm('确定要删除吗？')){
        this.svg = this.svg.filter(item => item.id !== this.currentId)
          if (this.currentPage === 1) {
            this.totalPage--
            this.currentId = this.svg[0].id
          } else {
            this.currentId = this.svg[this.currentPage - 2].id
            this.totalPage--
            this.currentPage--
          }
      } else {
        message.info('谢大佬饶命')
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

  // 改变线宽
  @action.bound
  changeStrokeWidth(e) {
    this.strokeWidth = e
  }

  get getPath() {
    return this.svg[this.currentPage - 1].path
  }
  @action.bound
  addPath(path: PathInput, userId) {
    const key = Math.floor(Math.random() * 1000000).toString()
    this.key.set(userId, key)
    this.getPath.set(key, pathToSvg(path))
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

}

export default createContext(new SvgStore())
