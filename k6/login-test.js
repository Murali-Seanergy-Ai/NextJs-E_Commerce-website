import http from "k6/http"
import { sleep } from "k6"

export let options = {
  vus: 10,
  duration: '2m'
}

const users = [
  { email: "muralikamme", password: "kamme@339" },
  { email: "murali.k@seanergy.ai", password: "Murali@339" }
]

export default function () {
  const url = 'http://app:3000/api/auth-login'

  const user = users[Math.floor(Math.random() * users.length)]

  const payload = JSON.stringify(user)

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  http.post(url, payload, params)

  sleep(1)
}