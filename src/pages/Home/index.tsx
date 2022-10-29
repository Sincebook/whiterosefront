import { useState } from "react"
import ChoiceBar from "../../common/ChoiceBar"
import OpBar from "../../common/OpBar"
import Palette from "../../common/Palette"
import SvgPaint from "../../common/SvgPaint"
import ToolBar from "../../common/ToolBar"

export default function Home() {
  let [clientX, setClientX] = useState(0)
  let [clientY, setClientY] = useState(0)
  function listenMouse(e) {
    setClientX(e.clientX)
    setClientY(e.clientY)
  }

  return (
    <div onMouseMove={listenMouse}>
      <div style={{position: 'fixed'}}>「{clientX},{clientY}」</div>
      <ToolBar />
      <Palette />
      <SvgPaint />
      <OpBar />
      <ChoiceBar />
    </div>
  )
}