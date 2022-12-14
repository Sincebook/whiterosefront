import { DeleteOutlined, DownloadOutlined, FileAddOutlined, LockOutlined, MinusCircleOutlined, MinusOutlined, MinusSquareOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined, RedoOutlined, SaveOutlined, StepBackwardOutlined, StepForwardOutlined, UndoOutlined, UploadOutlined } from '@ant-design/icons'
import Tooltip from 'antd/es/tooltip'
import { observer } from 'mobx-react'
import { useContext, useState, useRef, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { wsUrl } from '../../config/ws_url'
import { MesMap, OpMap } from '../../contant/options'
import BarStore from '../../store/BarStore'
import OptionStore from '../../store/OptionStore'
import SvgStore from '../../store/SvgStore'
import { delegate } from '../../utils/delegate'
import { exportToPng } from "../../utils/exportToPng"
import { mesHandle, pageSvgHandle, unDoHandle, clearHandle, lockHandle } from '../../utils/mesHandle'
import { Button, message, Popconfirm } from 'antd'
import './index.css'

export default observer(function OpBar() {
  const { sendMessage, lastMessage } = useWebSocket(wsUrl, { share: true })

  useEffect(() => {
    const unredo = unDoHandle(lastMessage)
    if (unredo) {
      if (unredo === MesMap.unDo) {
        svgStore.unDo()
      } else if (unredo === MesMap.reDo) {
        svgStore.reDo()
      } else {
        svgStore.remotePushOp(unredo)
      }
    }

    const mess = pageSvgHandle(lastMessage)
    if (mess) {
      if (mess.type === 301) {
        svgStore.lastPage()
      } else if (mess.type === 302) {
        svgStore.nextPage()
      } else if (mess.type === 303) {
        svgStore.addSvg()
      } else if (mess.type === 304) {
        svgStore.deleteSvg()
      }
    }

    const clearMessage = clearHandle(lastMessage)
    if (clearMessage) {
      svgStore.clear()
    }

    const lockMessage = lockHandle(lastMessage)
    if (lockMessage) {
      svgStore.lock()
    }
  }, [lastMessage])

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
  // ?????????
  const handleLast = () => {
    sendMessage(mesHandle(MesMap.page, {
      type: OpMap.lastPage
    }))
    svgStore.lastPage()
  }
  // ?????????
  const handleNext = () => {
    sendMessage(mesHandle(MesMap.page, {
      type: OpMap.nextPage
    }))
    svgStore.nextPage()
  }
  // ????????????
  const handleAdd = () => {
    sendMessage(mesHandle(MesMap.page, {
      type: OpMap.addPage
    }))
    svgStore.addSvg()
  }
  // ???????????????
  const handleDelete = () => {
    sendMessage(mesHandle(MesMap.page, {
      type: OpMap.deletePage
    }))
    svgStore.deleteSvg()
  }
  // ??????
  const undo = () => {
    svgStore.unDo(sendMessage)
  }

  const redo = () => {
    svgStore.reDo(sendMessage)
  }

  const clean = () => {
    console.log('123');
    svgStore.clear(sendMessage)
  }
  const lock = () => {
    svgStore.lock(sendMessage)
  }

  return (
    <div className="op-bar" onClick={handleSwitch} style={show} data-html2canvas-ignore ref={boxRef}>
      <Popconfirm placement="top" title={"?????????????????????????????????????????????????????????"} onConfirm={clean} okText="??????" cancelText="??????">
        <Tooltip placement="top" title={'??????'}>
          <DeleteOutlined className="icons" />
        </Tooltip>
      </Popconfirm>
      <Tooltip placement="top" title={'??????'} getPopupContainer={() =>  boxRef.current } >
        <DownloadOutlined className="icons" onClick={download}/>
      </Tooltip>
      <Tooltip placement="top" title={'??????'}>
        <UploadOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="top" title={'??????'}>
        <UndoOutlined className="icons" onClick={undo} />
      </Tooltip>
      <Tooltip placement="top" title={'??????'}>
        <RedoOutlined className="icons" onClick={redo} />
      </Tooltip>
      <Tooltip placement="top" title={'?????????'}>
        <StepBackwardOutlined className="icons" onClick={handleLast} />
      </Tooltip>
      <Tooltip placement="top" title={'?????????'}>
        <StepForwardOutlined className="icons" onClick={handleNext} />
      </Tooltip>
      <Tooltip placement="top" title={'??????'}>
        <PlusOutlined className="icons" onClick={handleAdd} />
      </Tooltip>
      <Tooltip placement="top" title={'??????'}>
        <MinusOutlined className="icons" onClick={handleDelete} />
      </Tooltip>
      <Tooltip placement="top" title={'??????'}>
        <LockOutlined className="icons" onClick={lock}/>
      </Tooltip>
    </div>
  )
})
