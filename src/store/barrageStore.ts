import { action, makeAutoObservable, observable } from "mobx"
import { createContext } from "react"

class MouseStore {
  @observable barrageStore = []
  
  constructor() {
    makeAutoObservable(this)
  }

}

export default createContext(new MouseStore())
