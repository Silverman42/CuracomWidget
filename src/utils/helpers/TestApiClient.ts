import { useWebSocketHandler } from '@/composables/websocket.handler'
import axios from 'axios'

export const TestApiClient = () => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_TEST_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Bearer ' + import.meta.env.VITE_TEST_TOKEN,
    },
  })

  client.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return client
}
