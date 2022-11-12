import http from "./client"
type img = string | ArrayBuffer

export const uploadImage = (image) => {
  return http.post<img, string>('/img/upload', image )
}