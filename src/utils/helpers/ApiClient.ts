import { useWebSocketHandler } from '@/composables/websocket.handler'
import axios from 'axios'

const getSessionId = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('curacom')
}

export const ApiClient = () => {
  const customHeaders: {
    [key: string]: string
  } = {}

  customHeaders[import.meta.env.VITE_X_CURACOM_WIDGET_HEADER] =
    window.localStorage.getItem(import.meta.env.VITE_WIDGET_ID) || 'None'

  customHeaders[import.meta.env.VITE_X_SOCKET_ID_HEADER] =
    useWebSocketHandler()?.socketInstance?.value?.socketId() || ''

  customHeaders['X-CURACOM-SESSION'] = getSessionId() || ''

  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...customHeaders,
    },
    withCredentials: true,
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
