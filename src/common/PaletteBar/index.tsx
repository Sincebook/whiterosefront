import { useContext } from 'react'
import { observer } from 'mobx-react'
import { Tooltip } from 'antd'

import BarStore from '../../store/BarStore'

import './index.css'

export default observer(function Palette() {
  const paletteStore = useContext(BarStore)
  const show = { right: paletteStore.palette ? '0': '-50px'}
  const handleSwitch = () => {
    paletteStore.paletteSwitch()
  }
  return (
    <div className="palette" onClick={handleSwitch} style={show}>
      <Tooltip placement="left" title={'莽丛绿'}>
        <div className="color mcl"></div>
      </Tooltip>
      <Tooltip placement="left" title={'雪白'}>
        <div className="color xb"></div>
      </Tooltip>
      <Tooltip placement="left" title={'茶花红'}>
        <div className="color chh"></div>
      </Tooltip>
      <Tooltip placement="left" title={'藏花红'}>
        <div className="color zhh"></div>
      </Tooltip>
      <Tooltip placement="left" title={'油菜花黄'}>
        <div className="color ychh"></div>
      </Tooltip>
      <Tooltip placement="left" title={'金莲花橙色'}>
        <div className="color jlhc"></div>
      </Tooltip>
      <Tooltip placement="left" title={'芥花紫'}>
        <div className="color jhz"></div>
      </Tooltip>
      <Tooltip placement="left" title={'牡丹花粉'}>
        <div className="color mdhf"></div>
      </Tooltip>
      <Tooltip placement="left" title={'牵牛花蓝'}>
        <div className="color qnhl"></div>
      </Tooltip>
    </div>
  )
})
