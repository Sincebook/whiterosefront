import './index.css'
import { AimOutlined, HighlightOutlined, FullscreenOutlined, BorderOutlined,
  FontSizeOutlined, CommentOutlined, FunctionOutlined, ShareAltOutlined, InstagramOutlined, PullRequestOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function ToolBar(sendMessage) {
  // let [fullScreenState, setFullScreenState] = useState(false)
  const sendMes = () => {
    sendMessage('ping')
  }
  
  function fullScreen() {
    document.getElementById('root').requestFullscreen()
  }
  return (
    <div className="tool-bar">
      <AimOutlined className="icons" onClick={sendMes}/>
      <HighlightOutlined className="icons" />
      <BorderOutlined className="icons" />
      <FontSizeOutlined className="icons" />
      <PullRequestOutlined className="icons"/>
      <InstagramOutlined className="icons"/>
      <CommentOutlined className="icons" />
      <FunctionOutlined className="icons"/>
      <FullscreenOutlined className="icons" onClick={fullScreen}/>
      <ShareAltOutlined className="icons" />
    </div>
  )
}
