import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

class OptionStore {
  @observable op = ''
  @observable palette = ''
  @observable tool = 'aim'
  @observable choice = ''
  @observable bg = 'mgl'

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound
  changeBg(e) {
    this.bg = e
  }

  @action.bound
  changeTool(e) {
    this.tool = e
  }

  @action.bound
  changeOp(e) {
    this.op = e
  }
}

export default createContext(new OptionStore())
