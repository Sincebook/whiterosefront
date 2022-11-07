import { createFromIconfontCN } from '@ant-design/icons'
import Tooltip from 'antd/es/tooltip'
import { observer } from 'mobx-react'
import { useContext } from 'react'
import BarStore from '../../store/BarStore'
import './index.css'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3751403_f4a8sbe8tc.js'
})

export default observer(function ChoiceBar () {
  const choiceStore = useContext(BarStore)
  const show = { left: choiceStore.choiceBar ? '0': '-50px'}
  const handleSwitch = () => {
    choiceStore.choiceSwitch()
  }
  return (
    <div className="choice-bar" onClick={handleSwitch} style={show} data-html2canvas-ignore>
      <Tooltip placement="right" title={'直线'}>
        <IconFont type="roseline" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'矩形'}>
        <IconFont type="rosexingzhuang-juxing" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'圆'}>
        <IconFont type="rosexingzhuang-tuoyuanxing" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'菱形'}>
        <IconFont type="rosediamond" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'椭圆'}>
        <IconFont type="rosetuoyuanxing" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'三角形'}>
        <IconFont type="rosexingzhuang-sanjiaoxing" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'箭头直线'}>
        <IconFont type="rosecc-arrow-right" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'箭头折线'}>
        <IconFont type="rosearrow-growth" className="icons"/>
      </Tooltip>
      <Tooltip placement="right" title={'曲线文本'}>
        <IconFont type="rosetext-wrap" className="icons"/>
      </Tooltip>
    </div>)
})
