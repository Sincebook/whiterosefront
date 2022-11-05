import { message, } from "antd";
import { action, get, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";
import { SvgInput, SvgOutput } from "../contant/svg";
import type { PathInput, RectInput } from "../contant/svgInput";
import { pathToSvg, svgToPath } from "../graph/path";
import { rectToSvg, svgToRect } from "../graph/rect";

class SvgStore {
  @observable svg: SvgOutput[] = [{ id: 1, path: [], rect: [] }]
  @observable currentPage: number = 1
  @observable totalPage: number = 1
  @observable id = 1
  @observable currentId = 1

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound
  addSvg() {
    this.svg.push({ id: this.id + 1, path: [], rect: [] })
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
        console.log(this.svg)
        this.svg = this.svg.filter(item => item.id !== this.currentId)
        console.log(this.svg)
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

  get getPath() {
    return this.svg[this.currentPage - 1].path
  }

  get getPathId() {
    return this.svg[this.currentPage - 1].path.length - 1
  }

  @action.bound
  addPath(path: PathInput) {
    this.getPath.push(pathToSvg(path))
  }

  @action.bound
  drawPath(x: number, y: number) {
    this.getPath[this.getPathId] = pathToSvg(svgToPath(this.getPath[this.getPathId], x, y))
  }

  get getRect() {
    return this.svg[this.currentPage - 1].rect
  }

  get getRectId() {
    return this.svg[this.currentPage - 1].rect.length - 1
  }

  @action.bound
  addRect(rect: RectInput) {
    this.getRect.push(rectToSvg(rect))
  }

  @action.bound
  drawRect(x: number, y: number) {
    this.getRect[this.getRectId] = rectToSvg(svgToRect(this.getRect[this.getRectId], x, y))
  }

  
}

export default createContext(new SvgStore())
