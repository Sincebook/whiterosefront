import { Tag } from 'antd';
import { useState, useCallback, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { wsUrl } from '../../config/ws_url';


export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  // const [socketUrl, setSocketUrl] = useState('ws://81.68.190.125:9009/chat');
  // const [messageHistory, setMessageHistory] = useState([]);
  const didUnmount = useRef(false)
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl,
  {
    shouldReconnect: (closeEvent) => {
      return didUnmount.current === false
    },
    reconnectAttempts: 10,
    reconnectInterval: 100,
    share: true
  });
  
  useEffect(() => {
    setInterval(()=> {sendMessage('ping')}, 10000)
  }, []);

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl('ws://81.68.190.125:9009/chat'),
  //   []
  // );

  const handleClickSendMessage = () => {
    console.log('ping')
    sendMessage('ping')
    console.log(lastMessage.data)
  }

  useEffect(() => {
    // setInterval(handleClickSendMessage, 2000)
  })
  // setInterval(handleClickSendMessage, 2000)

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: '在线',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div style={{ zIndex: '99', position: 'fixed', bottom: '5px', left: '10px', color: 'green'}}>
      <Tag color="green">{connectionStatus}</Tag>
    </div>
  );
};