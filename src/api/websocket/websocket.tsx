import { Tag } from 'antd';
import { useState, useCallback, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { wsUrl } from '../../config/ws_url';
import { MesMap } from '../../contant/options';
import { mesHandle } from '../../utils/mesHandle';


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
    if (lastMessage) {
      if (lastMessage.data != "pong" && lastMessage.data !== undefined) {
        const mes = JSON.parse(lastMessage.data)
        if (mes.data.type === 300) {
          setPerson(mes.data.data)
        }
      }
    }
  }, [lastMessage])
  const [person, setPerson] = useState(1)
  useEffect(() => {
    setInterval(()=> {
      sendMessage('ping')
      sendMessage(mesHandle(MesMap.persons))
    }, 10000)
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: '在线',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div style={{ zIndex: '99', position: 'fixed', bottom: '5px', left: '10px', color: 'green', userSelect: 'none'}} data-html2canvas-ignore>
      <Tag color="green">{connectionStatus}:{person}</Tag>
    </div>
  );
};