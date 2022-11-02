
import { useContext } from 'react'
import { observer } from 'mobx-react'
import { AimOutlined, HighlightOutlined, FullscreenOutlined, BorderOutlined,
  FontSizeOutlined, CommentOutlined, FunctionOutlined, ShareAltOutlined, InstagramOutlined,
  PullRequestOutlined } from '@ant-design/icons'
import Tooltip from 'antd/es/tooltip'
import { delegate } from '../../utils/delegate'
import OptionStore from '../../store/OptionStore'
import BarStore from '../../store/BarStore'

import './index.css'

export default observer(function ToolBar(sendMessage) {
  const toolStore = useContext(BarStore)
  const optionStore = useContext(OptionStore)
  const show = { top: toolStore.toolBar ? '0': '-50px'}
  const handleSwitch = (e) => {
    const [flag, el] = delegate('div', 'span', e.target)
    if (flag) {
      optionStore.tool = el.childNodes[0].dataset.icon
    } else {
      toolStore.toolSwitch()
    }
  }

  const fullScreen = () => {
    document.getElementById('root').requestFullscreen()
  }

  return (
    <div className="tool-bar" onClick={handleSwitch} style={show}>
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
        <InstagramOutlined className="icons"/>
      </Tooltip>
      <Tooltip placement="bottom" title={'聊天'}>
      <CommentOutlined className="icons" />
      </Tooltip>
      <Tooltip placement="bottom" title={'公式'}>
        <FunctionOutlined className="icons"/>
      </Tooltip>
      <Tooltip placement="bottom" title={'全屏'}>
        <FullscreenOutlined className="icons" onClick={fullScreen}/>
      </Tooltip>
      <Tooltip placement="bottom" title={'分享'}>
        <ShareAltOutlined className="icons" />
      </Tooltip>
    </div>
  )
})
