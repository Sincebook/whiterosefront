import { action, makeAutoObservable, observable } from "mobx"
import { createContext } from "react"

class MouseStore {
  @observable x = 0
  @observable y = 0
  @observable startX = 0
  @observable startY = 0
  @observable lite = [0, 0]
  @observable mouseDown = false
  @observable offsetLeft = 100
  @observable offsetTop = 100
  @observable clientWidth = document.body.clientWidth
  @observable clientHeight = document.body.clientHeight

  constructor() {
    makeAutoObservable(this)
  }

  @action.bound handleMouseDown(e) {
    this.startX = e.clientX
    this.startY = e.clientY
  }
  @action.bound mouseMove(e) {
    this.x = Math.floor(e.clientX)
    this.y = Math.floor(e.clientY)
    this.lite = [Math.floor(e.clientX), Math.floor(e.clientY)]
  }
  @action.bound handleTouchDown(e) {
    this.x = Math.floor(e.clientX)
    this.y = Math.floor(e.clientY)
    this.startX = Math.floor(e.clientX)
    this.startY = Math.floor(e.clientY)
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
