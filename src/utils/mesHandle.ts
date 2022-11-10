export const mesHandle = (type: number, data?: any) => {
  return JSON.stringify({roomId: 7, fromId: localStorage.getItem('userId'), type, data})
}

export const lastMesHandle = (data) => {
  if (data) {
    if (data.data != "pong") {
        const mes = JSON.parse(data.data)
        if (mes.data.type === 201) {
          if (mes.data.fromId.toString() !== localStorage.getItem('userId')) {
            return JSON.parse(mes.data.data)
          } 
        }
    }
  }
}

export const barrageHandle = (data) => {
  if (data) {
    if (data.data != "pong" && data.data !== undefined) {
        const mes = JSON.parse(data.data)
        if (mes.data.type === 0) {
          if (mes.data.fromId.toString() !== localStorage.getItem('userId')) {
            return mes.data.data
          } 
        }
    }
  }
}

