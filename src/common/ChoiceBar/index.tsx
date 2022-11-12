import { createFromIconfontCN } from '@ant-design/icons'
import Tooltip from 'antd/es/tooltip'
import { observer } from 'mobx-react'
import { useContext } from 'react'
import BarStore from '../../store/BarStore'
import OptionStore from '../../store/OptionStore'
import SvgStore from '../../store/SvgStore'
import { delegate } from '../../utils/delegate'
import './index.css'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3751403_tglqvf3dte7.js'
})

export default observer(function ChoiceBar () {
  const choiceStore = useContext(BarStore)
  const optionStore = useContext(OptionStore)
  const svgStore = useContext(SvgStore)
  const show = { left: choiceStore.choiceBar ? '0': '-50px'}


  const handleSwitch = (e) => {
    const [flag, el] = delegate('div', 'span', e.target)
    if (flag) {
      optionStore.changeChoice(el.dataset.id)
      if (optionStore.choice === 'line') {
        svgStore.changeStrokeWidth(1)
      } else if (optionStore.choice === 'line1') {
        svgStore.changeStrokeWidth(2)
      }  else if (optionStore.choice === 'line2') {
        svgStore.changeStrokeWidth(3)
      } else if (optionStore.choice === 'line3') {
        svgStore.changeStrokeWidth(4)
      } else if (optionStore.choice === 'line4') {
        svgStore.changeStrokeWidth(5)
      } else if (optionStore.choice === 'line5') {
        svgStore.changeStrokeWidth(6)
      } else if (optionStore.choice === 'line6') {
        svgStore.changeStrokeWidth(7)
      }
    } else {
      choiceStore.choiceSwitch()
    }
  }

  return (
    <div className="choice-bar" onClick={handleSwitch} style={show} data-html2canvas-ignore>
      <Tooltip placement="right" title={'定位'} >
        <IconFont type="rosedingwei" className="icons" data-id="line"
        style={optionStore.tool === 'aim' ? {}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'拖拽'} >
        <IconFont type="roseyidong" className="icons" data-id="line"
        style={optionStore.tool === 'aim' ? {}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'直线'} >
        <IconFont type="roseline" className="icons" data-id="line"
        style={optionStore.tool === 'highlight' ? {fontSize:'8px'}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'直线'} >
        <IconFont type="roseline" className="icons" data-id="line1"
        style={optionStore.tool === 'highlight' ? {fontSize:'10px'}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'直线'} >
        <IconFont type="roseline" className="icons" data-id="line2"
        style={optionStore.tool === 'highlight' ? {fontSize:'14px'}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'直线'} >
        <IconFont type="roseline" className="icons" data-id="line3"
        style={optionStore.tool === 'highlight' ? {fontSize:'16px'}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'直线'} >
        <IconFont type="roseline" className="icons" data-id="line4"
        style={optionStore.tool === 'highlight' ? {fontSize:'18px'}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'直线'} >
        <IconFont type="roseline" className="icons" data-id="line5"
        style={optionStore.tool === 'highlight' ? {fontSize:'20px'}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'直线'} >
        <IconFont type="roseline" className="icons" data-id="line6"
        style={optionStore.tool === 'highlight' ? {fontSize:'22px'}: { display: 'none' }} />
      </Tooltip>
      <Tooltip placement="right" title={'矩形'}>
        <IconFont type="rosexingzhuang-juxing" className="icons" data-id="rect"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'圆'}>
        <IconFont type="rosexingzhuang-tuoyuanxing" className="icons" data-id="circle"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'菱形'}>
        <IconFont type="rosediamond" className="icons" data-id="diamond"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'椭圆'}>
        <IconFont type="rosetuoyuanxing" className="icons" data-id="ellipse"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'三角形'}>
        <IconFont type="rosexingzhuang-sanjiaoxing" className="icons" data-id="triangle"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'圆角矩形'}>
        <IconFont type="roseyuanjiaojuxing" className="icons" data-id="triangle"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'心形'}>
        <IconFont type="roseaixin" className="icons" data-id="triangle"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'五角星'}>
        <IconFont type="rosekongwujiaoxing" className="icons" data-id="triangle"
        style={optionStore.tool === 'border' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'折线'}>
        <IconFont type="rosezhexian" className="icons" data-id="arrow"
        style={optionStore.tool === 'pull-request' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'箭头直线'}>
        <IconFont type="rosecc-arrow-right" className="icons" data-id="arrow"
        style={optionStore.tool === 'pull-request' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'箭头折线'}>
        <IconFont type="rosearrow-growth" className="icons" data-id="polyline"
        style={optionStore.tool === 'pull-request' ? {}: { display: 'none' }}/>
      </Tooltip>
      <Tooltip placement="right" title={'曲线文本'}>
        <IconFont type="rosetext-wrap" className="icons" data-id="textpath"
        style={optionStore.tool === 'pull-request' ? {}: { display: 'none' }}/>
      </Tooltip>
    </div>)
})
