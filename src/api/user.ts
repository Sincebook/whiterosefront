import http from "./client"
import { MyInfo, UserInfo } from "../contant/user"

export const addUser = () => {
  return http.post<UserInfo, undefined>('/user/add')
}

export const findMyInfo = () => {
  return http.get<MyInfo>('/user/findme')
}