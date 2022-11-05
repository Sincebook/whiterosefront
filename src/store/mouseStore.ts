import { action, makeAutoObservable, observable } from "mobx"
import { createContext } from "react"
class MouseStore {
  @observable x = 0
  @observable y = 0
  @observable lite = [0, 0]
  @observable mouseDown = false

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound mouseMove(e) {
    this.x = e.clientX
    this.y = e.clientY
    this.lite = [e.clientX, e.clientY]
  }

  get getx() {
    return this.x
  }

  @action.bound mouseDownAciton() {
    this.mouseDown = true
  }

  @action.bound mouseUpAction() {
    this.mouseDown = false
  }  
}

export default createContext(new MouseStore())
