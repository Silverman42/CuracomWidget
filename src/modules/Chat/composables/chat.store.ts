import { useInitiatorStore } from '@/composables/initiator.store'
import { useWebSocketHandler } from '@/composables/websocket.handler'
import { ApiClient } from '@/utils/helpers/ApiClient'
import { ApiRoutes } from '@/utils/helpers/ApiRoutes'
import { TestApiClient } from '@/utils/helpers/TestApiClient'
import type { IResponse } from '@/utils/types/response/global'
import type { IChatHistory } from '@/utils/types/response/Initiator'
import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useChatStore = createGlobalState(() => {
  const sendingMessage = ref(false)

  const sendingAgentMessage = ref(false)

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

    async triggerAgentmessage(payload: { body?: string }) {
      sendingAgentMessage.value = true
      try {
        const { data } = await TestApiClient().post<IResponse<IChatHistory>>(
          ApiRoutes.CHAT_TRIGGER_AGENT_MESSAGE(
            useInitiatorStore().initiatorData.value.customer?.chat_uid || '',
          ),
          payload,
        )
        sendingAgentMessage.value = false
        return data
      } catch (error) {
        sendingAgentMessage.value = false
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

    listenAndJoin(successCallback: (e: IChatHistory) => void, errorCallback: (e: any) => void) {
      return useWebSocketHandler()
        .socketInstance.value?.join(
          `chat.${useInitiatorStore().initiatorData.value.customer?.chat_uid}`,
        )
        .listen('MessageSent', (e: IChatHistory) => {
          action.appendSingleToQueue(e).then(() => {
            successCallback(e)
          })
        })
        .error((e: any) => {
          errorCallback(e)
        })
    },

    joinChat() {
      return useWebSocketHandler().socketInstance.value?.join(
        `chat.${useInitiatorStore().initiatorData.value.customer?.chat_uid}`,
      )
    },
  }

  return {
    sendingMessage,
    sendingAgentMessage,
    chatQueue,
    ...action,
  }
})
