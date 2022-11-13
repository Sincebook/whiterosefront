import { RoomsData } from "../contant/rooms"
import http from "./client"

export const addRoom = () => {
  return http.post<RoomsData, string>('/rooms/add')
}

export const confirmRoom = (rooms_id) => {
  return http.get('/rooms/confirm', { rooms_id })
}