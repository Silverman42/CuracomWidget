import axios from 'axios'

export const ApiClient = () => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      'X-Curacom-Widget': window.localStorage.getItem(import.meta.env.VITE_WIDGET_ID) || 'None',
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
