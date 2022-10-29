import './index.css'
import { Tooltip } from 'antd'

export default function Palette() {
  return (
    <div className="palette">
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
}
