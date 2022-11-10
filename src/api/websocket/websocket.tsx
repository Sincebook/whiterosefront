import { Tag } from 'antd';
import { useState, useCallback, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { wsUrl } from '../../config/ws_url';


export const WebSocketDemo = () => {

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

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: '在线',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div style={{ zIndex: '99', position: 'fixed', bottom: '5px', left: '10px', color: 'green'}} data-html2canvas-ignore>
      <Tag color="green">{connectionStatus}</Tag>
    </div>
  );
};