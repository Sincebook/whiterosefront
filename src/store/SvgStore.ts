import { message, } from "antd";
import { action, get, makeAutoObservable, observable } from "mobx";
import { createContext, useId } from "react";
import { SvgInput, SvgOutput } from "../contant/svg";
import type { PathInput, RectInput, ArrowInput, TextInput } from "../contant/svgInput";
import { pathToSvg, svgToPath } from "../graph/path";
import { rectToSvg, svgToRect } from "../graph/rect";
import { arrowToSvg, svgToArrow } from "../graph/arrow"
import { textToSvg, svgToText } from "../graph/text"

class SvgStore {
  @observable svg: SvgOutput[] = [{ id: 1, path: new Map(), rect: new Map(), arrow: new Map(), text: new Map() }]
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
    this.svg.push({ id: this.id + 1, path: new Map(), rect: new Map(), arrow: new Map(), text: new Map() })
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

  
}

export default createContext(new SvgStore())
