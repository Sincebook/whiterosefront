import { action, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

class BarStore {
  @observable opBar = false
  @observable toolBar = false
  @observable palette = false
  @observable choiceBar = false
  constructor() {
    makeAutoObservable(this)
  }
  @action.bound
  allSwitch() {
    if (this.opBar) {
      this.opBar = false
      this.toolBar = false
      this.palette = false
      this.choiceBar = false
    } else {
      this.opBar = true
      this.toolBar = true
      this.palette = true
      this.choiceBar = true
    }
  }
  @action.bound
  opSwitch() {
    this.opBar = !this.opBar
  }
  @action.bound
  toolSwitch() {
    this.toolBar = !this.toolBar
  }
  @action.bound
  paletteSwitch() {
    this.palette = !this.palette
  }
  @action.bound
  choiceSwitch() {
    this.choiceBar = !this.choiceBar
  }
}

export default createContext(new BarStore())
