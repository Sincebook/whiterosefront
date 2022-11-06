export interface MesInfo {
  type: number
  fromId: number // 发送人id
  roomId: number,// 所在房间
  time?: string //时间戳，前端不需要发送
  data?: {} // 操作内容
}
