import type { IIdentifierResponse } from '@/utils/types/response/Initiator'
import { createGlobalState } from '@vueuse/core'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { ref } from 'vue'

export const useWebSocketHandler = createGlobalState(() => {
  const socketInstance = ref<Echo<'reverb'> | null>(null)

  const actions = {
    createInstance(identifierResponse: IIdentifierResponse) {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Pusher = Pusher

        socketInstance.value = new Echo({
          broadcaster: identifierResponse.websocket_config.broadcaster,
          key: identifierResponse.websocket_config.key,
          wsHost: identifierResponse.websocket_config.wsHost,
          wsPort: identifierResponse.websocket_config.wsPort,
          wssPort: identifierResponse.websocket_config.wssPort,
          forceTLS: true,
          enabledTransports: ['ws', 'wss'],
        })
      } catch (error) {
        console.log(error)
      }
    },
  }

  return {
    socketInstance,
    ...actions,
  }
})
