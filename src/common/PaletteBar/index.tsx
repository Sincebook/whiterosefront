import { useContext } from 'react'
import { observer } from 'mobx-react'
import { Tooltip } from 'antd'

import BarStore from '../../store/BarStore'
import OptionStore from '../../store/OptionStore'

import './index.css'

export default observer(function Palette() {
  const paletteStore = useContext(BarStore)
  const optionStore = useContext(OptionStore)

  const show = { right: paletteStore.palette ? '0': '-50px'}
  const handleSwitch = (e) => {
    if (e.target.dataset.id) {
      console.log(optionStore)
      if (optionStore.tool === 'aim') {
        optionStore.changeBg(e.target.dataset.id)
      }
    } else {
      paletteStore.paletteSwitch()
    }
    
  }
  return (
    <div className="palette" onClick={handleSwitch} style={show}>
      <Tooltip placement="left" title={'莽丛绿'}>
        <div className="color mcl" data-id="mcl"></div>
      </Tooltip>
      <Tooltip placement="left" title={'雪白'}>
        <div className="color xb" data-id="xb"></div>
      </Tooltip>
      <Tooltip placement="left" title={'茶花红'}>
        <div className="color chh" data-id="chh"></div>
      </Tooltip>
      <Tooltip placement="left" title={'藏花红'}>
        <div className="color zhh" data-id="zhh"></div>
      </Tooltip>
      <Tooltip placement="left" title={'油菜花黄'}>
        <div className="color ychh" data-id="ychh"></div>
      </Tooltip>
      <Tooltip placement="left" title={'金莲花橙'}>
        <div className="color jlhc" data-id="jlhc"></div>
      </Tooltip>
      <Tooltip placement="left" title={'芥花紫'}>
        <div className="color jhz" data-id="jhz"></div>
      </Tooltip>
      <Tooltip placement="left" title={'牡丹花粉'}>
        <div className="color mdhf" data-id="mdhf"></div>
      </Tooltip>
      <Tooltip placement="left" title={'牵牛花蓝'}>
        <div className="color qnhl" data-id="qnhl"></div>
      </Tooltip>
    </div>
  )
})
