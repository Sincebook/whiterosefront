import { observer } from "mobx-react"
import { useContext, useState } from "react"
import ChoiceBar from "../../common/ChoiceBar"
import OpBar from "../../common/OpBar"
import Palette from "../../common/PaletteBar"
import SvgPaint from "../../common/SvgPaint"
import ToolBar from "../../common/ToolBar"
import MouseStore from "../../store/MouseStore"

import './index.css'

export default observer(function Home() {
  const mouseStore = useContext(MouseStore)
  function listenMouse(e) {
    mouseStore.mouseMove(e)
  }
  return (
    <div onMouseMove={listenMouse}>
      <div style={{position: 'fixed', zIndex: 99}}>「{mouseStore.x},{mouseStore.y}」</div>
      <ToolBar />
      <Palette />
      <SvgPaint />
      <OpBar />
      <ChoiceBar />
    </div>
  )
})