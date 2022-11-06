export interface MyInfo {
  address: string
  id: number
  image: string | null
  name: string
  status: number
  uptime: string
}

export interface UserInfo {
  token: string
  users: MyInfo
}
