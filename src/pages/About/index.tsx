import { useEffect, useState } from "react"
import { findByRoomId } from "../../api/svg"

export default function About() {
  const [id, setId] = useState(0)
  const [name, setName] = useState('loading')

  useEffect(() => {
    findByRoomId('1').then(res => {
      setId(res.id)
      setName(res.svg)
    })
  })

  return (
    <div>
      <h1>房间号：{id}</h1>
      <p>房间名：{name}</p>
    </div>
  )
}