import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

class OptionStore {
  @observable op = ''
  @observable palette = ''
  @observable tool = 'highlight'
  @observable choice = ''
  @observable bg = 'mgl'
  @observable color = '#141e1b'


  constructor() {
    makeAutoObservable(this)
  }
  // 改变背景
  @action.bound
  changeBg(e) {
    this.bg = e
  }
  // 改变tool选项
  @action.bound
  changeTool(e) {
    this.tool = e
  }
  // 改变option选项 
  @action.bound
  changeOp(e) {
    this.op = e
  }
  // 改变颜色
  @action.bound
  changeColor(e) {
    switch (e) {
      case 'cml':
        this.color = '#141e1b'
        break
      case 'xb':
        this.color = '#fffef9'
        break
      case 'chh':
        this.color = '#ee3f4d'
        break
      case 'zhh':
        this.color = '#ec2d7a'
        break
      case 'ychh':
        this.color = '#fbda41'
        break
      case 'jlhc':
        this.color = '#f86b1d'
        break
      case 'jhz':
        this.color = '#983680'
        break
      case 'mdhf':
        this.color = '#eea2a4'
        break
      case 'qnhl':
        this.color = '#1177b0'
        break
    }
  }
}

export default createContext(new OptionStore())
