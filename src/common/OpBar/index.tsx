import { DeleteOutlined, DownloadOutlined, FileAddOutlined, LockOutlined, MinusCircleOutlined, MinusOutlined, MinusSquareOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined, RedoOutlined, SaveOutlined, StepBackwardOutlined, StepForwardOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons'
import Tooltip from 'antd/es/tooltip'
import { observer } from 'mobx-react'
import { useContext, useState, useRef } from 'react'
import BarStore from '../../store/BarStore'
import OptionStore from '../../store/OptionStore'
import SvgStore from '../../store/SvgStore'
import { delegate } from '../../utils/delegate'
import { exportToPng } from "../../utils/exportToPng"
import './index.css'

export default observer(function OpBar() {
  const barStore = useContext(BarStore)
  const optionStore = useContext(OptionStore)
  const svgStore = useContext(SvgStore)
  const boxRef = useRef(null)

  const show = { bottom: barStore.opBar ? '0' : '-50px' }
  const handleSwitch = (e) => {
    const [flag, el] = delegate('div', 'span', e.target)
    if (flag) {
      optionStore.changeOp(el.childNodes[0].dataset.icon)
    } else {
      barStore.opSwitch()
    }
  }

  const download = () => {
    exportToPng()
  }
 
  const handleLast = () => {
    svgStore.lastPage()
  }

  const handleNext = () => {
    svgStore.nextPage()
  }

  const handleAdd = () => {
    svgStore.addSvg()
  }

  const handleDelete = () => {
    svgStore.deleteSvg()
  }

  return (
    <div className="op-bar" onClick={handleSwitch} style={show} data-html2canvas-ignore ref={boxRef}>
      <Tooltip placement="top" title={'清空'}>
        <DeleteOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="top" title={'下载'} getPopupContainer={() =>  boxRef.current } >
        <DownloadOutlined className="icons" onClick={download}/>
      </Tooltip>
      <Tooltip placement="top" title={'上传'}>
        <UploadOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="top" title={'恢复'}>
        <UndoOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="top" title={'撤销'}>
        <RedoOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="top" title={'上一页'}>
        <StepBackwardOutlined className="icons" onClick={handleLast} />
      </Tooltip>
      <Tooltip placement="top" title={'下一页'}>
        <StepForwardOutlined className="icons" onClick={handleNext} />
      </Tooltip>
      <Tooltip placement="top" title={'新增'}>
        <PlusOutlined className="icons" onClick={handleAdd} />
      </Tooltip>
      <Tooltip placement="top" title={'删除'}>
        <MinusOutlined className="icons" onClick={handleDelete} />
      </Tooltip>
      <Tooltip placement="top" title={'锁屏'}>
        <LockOutlined className="icons" />
      </Tooltip>
    </div>
  )
})
