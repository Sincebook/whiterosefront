import { observer } from "mobx-react"
import { useContext, useEffect, useRef, useState } from "react"
import { findMyInfo } from "../../api/user"
import { WebSocketDemo } from "../../api/websocket/websocket"
import ChoiceBar from "../../common/ChoiceBar"
import OpBar from "../../common/OpBar"
import Palette from "../../common/PaletteBar"
import SvgPaint from "../../common/SvgPaint"
import ToolBar from "../../common/ToolBar"
import MouseStore from "../../store/PositionStore"

import './index.css'

export default observer(function Home() {
  const mouseStore = useContext(MouseStore)
  function listenMouse(e) {
    mouseStore.mouseMove(e)
  }
  function listenTouch(e) {
    mouseStore.mouseMove(e.touches[0])
  }
  return (
    <div onMouseMove={listenMouse} onTouchMove={listenTouch}>
      <div style={{position: 'fixed', zIndex: 99}} data-html2canvas-ignore>「{mouseStore.x},{mouseStore.y}」</div>
      <div style={{position: 'fixed', zIndex: 99, right: 10}} data-html2canvas-ignore>房间号: {localStorage.getItem('roomId')}</div>
      <ToolBar />
      <Palette />
      <SvgPaint />
      <OpBar />
      <ChoiceBar />
      <WebSocketDemo/>
    </div>
  )
})