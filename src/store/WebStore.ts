import { makeAutoObservable, observable } from "mobx";
import { createContext } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

class WebStore {
  @observable readState = null

  constructor() {
    makeAutoObservable(this)
    // const { readyState } = useWebSocket('ws://81.68.190.125:9009/chat')
    // console.log(readyState)
    // this.readState = readyState
  }


}

export default createContext(new WebStore())
