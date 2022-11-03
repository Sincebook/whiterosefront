import { message, } from "antd";
import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";
import { Svg } from "../contant/svg";

class SvgStore {
  @observable svg: Svg[] = [{ id: 1 }]
  @observable currentPage: number = 1
  @observable totalPage: number = 1
  @observable id = 1
  @observable currentId = 1

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound
  addSvg() {
    this.svg.push({ id: this.id + 1 })
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
}

export default createContext(new SvgStore())
