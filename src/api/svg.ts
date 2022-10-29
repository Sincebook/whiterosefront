import http from "./client"
import { SvgData } from "../contant/svg"

export const findByRoomId = (room_id: string) => {
  return http.get<SvgData>('/svgs/findByRoomId', { room_id })
}
