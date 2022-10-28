import http from "./client"
import { svgData } from "../contant/svg"

export const findByRoomId = (room_id: string) => {
  return http.get<svgData>('/svgs/findByRoomId', { room_id })
}
