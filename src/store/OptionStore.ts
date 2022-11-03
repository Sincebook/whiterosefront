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
}

export default createContext(new OptionStore())
