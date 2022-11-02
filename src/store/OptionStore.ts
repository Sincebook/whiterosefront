import { makeAutoObservable, observable } from "mobx";
import { createContext } from "react";

class OptionStore {
  @observable op = ''
  @observable palette = ''
  @observable tool = ''
  @observable choice = ''

  constructor() {
    makeAutoObservable(this)
  }
}

export default createContext(new OptionStore())
