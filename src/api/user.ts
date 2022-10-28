import http from "./client"
import { MyInfo } from "../contant/user"

export const addUser = () => {
  return http.post<string, string>('/user/add')
}

export const findMyInfo = () => {
  return http.get<MyInfo>('/user/findme')
}