import type { IIdentifierResponse } from '@/utils/types/response/Initiator'
import { createGlobalState } from '@vueuse/core'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { ref } from 'vue'

export const useWebSocketHandler = createGlobalState(() => {
  const socketInstance = ref<Echo<'reverb'> | null>(null)

  const customHeaders: {
    [key: string]: string
  } = {}

  const actions = {
    createInstance(identifierResponse: IIdentifierResponse) {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Pusher = Pusher

        customHeaders[import.meta.env.VITE_X_CURACOM_WIDGET_HEADER] =
          window.localStorage.getItem(import.meta.env.VITE_WIDGET_ID) || 'None'

        customHeaders[import.meta.env.VITE_X_CURACOM_COOKIE_HEADER] =
          identifierResponse?.visitor?.uid || ''

        socketInstance.value = new Echo({
          broadcaster: identifierResponse?.websocket_config?.broadcaster || 'reverb',
          key: identifierResponse?.websocket_config?.key,
          wsHost: identifierResponse?.websocket_config?.wsHost,
          wsPort: identifierResponse?.websocket_config?.wsPort,
          wssPort: identifierResponse?.websocket_config?.wssPort,
          forceTLS: true,
          authEndpoint: identifierResponse?.websocket_config?.authEndpoint,
          enabledTransports: ['ws', 'wss'],
          auth: {
            headers: customHeaders,
          },
        })
      } catch (error) {}
    },

    disconnect() {
      socketInstance.value?.disconnect()
    },
  }

  return {
    socketInstance,
    ...actions,
  }
})
