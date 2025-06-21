import { useInitiatorStore } from '@/composables/initiator.store'
import { useWebSocketHandler } from '@/composables/websocket.handler'
import { ApiClient } from '@/utils/helpers/ApiClient'
import { ApiRoutes } from '@/utils/helpers/ApiRoutes'
import type { IResponse } from '@/utils/types/response/global'
import type { IChatHistory } from '@/utils/types/response/Initiator'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useChatStore = createGlobalState(() => {
  const sendingMessage = ref(false)

  const chatQueue = ref<IChatHistory[]>([])

  const action = {
    async sendMessage(payload: { body?: string; media?: File }) {
      sendingMessage.value = true
      try {
        const data = await ApiClient().post<IResponse<IChatHistory>>(
          ApiRoutes.CHAT_SEND_MESSAGE,
          payload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        sendingMessage.value = false
        return data
      } catch (error) {
        sendingMessage.value = false
        throw error
      }
    },

    async appendSingleToQueue(payload: IChatHistory) {
      await chatQueue.value.push(payload)
      return
    },

    clearQueue() {
      chatQueue.value = []
    },

    async appendManyToQueue(payload: IChatHistory[]) {
      await chatQueue.value.push(...payload)
      return
    },

    joinChat() {
      useWebSocketHandler()
        .socketInstance.value?.join(
          `chat.${useInitiatorStore().initiatorData.value.customer?.chat_uid}`,
        )
        .listen('MessageSent', (e: any) => {
          console.log(e)
        })
        .error((e: any) => {
          console.log(e)
        })
    },
  }

  return {
    sendingMessage,
    chatQueue,
    ...action,
  }
})
