import { createGlobalState } from '@vueuse/core'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { ref } from 'vue'

export const useWebSocketHandler = createGlobalState(() => {
  const socketInstance = ref<Echo<'reverb'> | null>(null)

  const actions = {
    createInstance() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let { pusher } = window
      pusher = Pusher

      socketInstance.value = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
      })
    },
  }

  return {
    socketInstance,
    ...actions,
  }
})
