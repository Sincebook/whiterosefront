import { useContext, useRef, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { AimOutlined, HighlightOutlined, FullscreenOutlined, BorderOutlined,
  FontSizeOutlined, CommentOutlined, FunctionOutlined, ShareAltOutlined, InstagramOutlined,
  PullRequestOutlined } from '@ant-design/icons'
import Tooltip from 'antd/es/tooltip'
import { Popover, Button } from 'antd'
import { delegate } from '../../utils/delegate'
import OptionStore from '../../store/OptionStore'
import BarStore from '../../store/BarStore'
import MouseStore from '../../store/PositionStore'

import BulletScreen, { StyledBullet } from 'rc-bullets'
import { randomColor } from "../../utils/randomColor"

import { wsUrl } from '../../config/ws_url'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { lastMesHandle, mesHandle, barrageHandle } from '../../utils/mesHandle'

import './index.css'

export default observer(function ToolBar() {
  const { sendMessage, readyState, lastMessage } = useWebSocket(wsUrl, { share: true })

  const toolStore = useContext(BarStore)
  const optionStore = useContext(OptionStore)
  const mouseStore = useContext(MouseStore)

  // 弹幕屏幕
  const [screen, setScreen] = useState(null)
  // 弹幕内容
  const [bullet, setBullet] = useState('')

  useEffect(() => {
    let bulletScreen = new BulletScreen(document.querySelector('.svgPage'))
    setScreen(bulletScreen)
  }, [])

  useEffect(() => {
    const mess = lastMesHandle(lastMessage)
    const initmess = barrageHandle(lastMessage)
    if (typeof initmess === 'string' && initmess.length) {
        screen.push(<StyledBullet msg={initmess} color="#fff" backgroundColor={randomColor()} size="normal" />)
    }
    if (mess) {
      if (mess.type === 10) {
        screen.push(<StyledBullet msg={mess.data} color="#fff" backgroundColor={randomColor()} size="normal" />)
      }
    }
  }, [lastMessage])

  const inputRef = useRef(null)
  const barrageRef = useRef(null)

  const show = { top: toolStore.toolBar ? '0': '-50px'}
  const handleSwitch = (e) => {
    mouseStore.mouseUpAction()
    const [flag, el] = delegate('div', 'span', e.target)
    if (flag) {
      optionStore.changeTool(el.childNodes[0].dataset.icon)
    } else {
      toolStore.toolSwitch()
    }
  }

  const updateImage = () => {
    inputRef.current.click()
  }
  const handleFiles = (e) => {
    console.log(e.target.files);
  }

  const fullScreen = () => {
    document.getElementById('root').requestFullscreen()
  }
  const barrageChange = (e) => {
    setBullet(e.target.value);
  }

  const sendBarrage = () => {
    barrageRef.current.value = ''
    if (bullet) {
      screen.push(<StyledBullet msg={bullet} color="#fff" backgroundColor={randomColor()} size="normal" />)
      sendMessage(mesHandle(201,
      {
        type: 10,
        data: bullet,
      }))
    }
  }
  const sendByKey = (e) => {
    if (e.keyCode === 13) {
      sendBarrage()
    }
  }

  const content = (
    <div>
      <input type="text" className='barrage' onChange={barrageChange} ref={barrageRef} onKeyDown={sendByKey} placeholder="点击回车发射弹幕～"/>
    </div>
  )

  return (
    <div className="tool-bar" onClick={handleSwitch} data-html2canvas-ignore>
      <Tooltip placement="bottom" title={'定位'} >
        <AimOutlined className="icons" name="lite" data-id="lite"/>
      </Tooltip>
      <Tooltip placement="bottom" title={'画笔'}>
        <HighlightOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="bottom" title={'形状'}>
        <BorderOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="bottom" title={'文字'}>
        <FontSizeOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="bottom" title={'箭头'}>
        <PullRequestOutlined className="icons"/>
      </Tooltip>
      <Tooltip placement="bottom" title={'图片'}>
        <InstagramOutlined className="icons" onClick={updateImage}/>
      </Tooltip>
      <Popover placement="bottom" content={content} trigger="click">
        <Tooltip placement="bottom" title={'弹幕'}>
          <CommentOutlined className="icons" />
        </Tooltip>
      </Popover>
      <Tooltip placement="bottom" title={'公式'}>
        <FunctionOutlined className="icons"/>
      </Tooltip>
      <Tooltip placement="bottom" title={'全屏'}>
        <FullscreenOutlined className="icons" onClick={fullScreen}/>
      </Tooltip>
      <Tooltip placement="bottom" title={'分享'}>
        <ShareAltOutlined className="icons" />
      </Tooltip>
      <input type="file" id="fileElem" multiple accept="image/*" onChange={handleFiles} ref={inputRef} />
      
    </div>
  )
})
