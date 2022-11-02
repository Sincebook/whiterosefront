import { observer } from 'mobx-react'
import { useContext } from 'react'
import BarStore from '../../store/BarStore'
import './index.css'

export default observer(function OpBar() {
  const barStore = useContext(BarStore)
  const show = { bottom: barStore.opBar ? '0' : '-50px'}
  const handSwitch = () => {
    barStore.opSwitch()
  }

  return (
    <div className="op-bar" onClick={handSwitch} style={show}></div>
  )
})
