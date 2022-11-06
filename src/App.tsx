import React, { ReactElement, useCallback, useEffect } from 'react'

import './style/App.css'
import { findMyInfo, addUser } from "./api/user"
import { addRoom } from './api/room'
import Home from './pages/Home'
import { MyInfo } from './contant/user'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { wsUrl } from './config/ws_url'
import { mesHandle } from './utils/mesHandle'

function App(): ReactElement {

  const roomId = localStorage.getItem('roomId')
  useEffect(()=> {
    const token: string = localStorage.getItem('token')
    if (roomId) {
      if (token) {
        findMyInfo().then(res => {
          localStorage.setItem('userId', res.id.toString())
        })
      } else {
        addUser().then(res => {
          localStorage.setItem('userId', res.users.id.toString())
          localStorage.setItem('token', res.token)
          // sendMessage(mesHandle({ fromId: res.users.id, roomId: parseInt(roomId), type: 0  }))
        })
      }
    } else {
      if (token) {
        findMyInfo().then(res => {
          localStorage.setItem('userId', res.id.toString())
          addRoom().then(res => {
            localStorage.setItem('roomId', res.id.toString())
            localStorage.setItem('owner', 'true')
            window.location.reload()
          })
        })
      } else {
        addUser().then(res => {
          localStorage.setItem('userId', res.users.id.toString())
          localStorage.setItem('token', res.token)
          addRoom().then(res => {
            localStorage.setItem('roomId', res.id.toString())
            localStorage.setItem('owner', 'true')
            window.location.reload()
          })
        })
      }
     
      
    }
  }, [])

  return (
    <div>
      <Home />
    </div>
  )
}

export default App;
