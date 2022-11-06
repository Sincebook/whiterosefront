export const mesHandle = (type: number, data?: any) => {
  if (!localStorage.getItem('roomId') || !localStorage.getItem('userId')) {
    window.location.reload()
  }
  return JSON.stringify({roomId: localStorage.getItem('roomId'), fromId: Math.floor(Math.random() * 100), type, data})
}
