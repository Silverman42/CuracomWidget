import { useInitiatorStore } from '@/composables/initiator.store'
import { useWebSocketHandler } from '@/composables/websocket.handler'
import { ApiClient } from '@/utils/helpers/ApiClient'
import { ApiRoutes } from '@/utils/helpers/ApiRoutes'
import { TestApiClient } from '@/utils/helpers/TestApiClient'
import type { IResponse } from '@/utils/types/response/global'
import type { IChatHistory } from '@/utils/types/response/Initiator'
import { createGlobalState } from '@vueuse/core'
import type { Broadcaster } from 'laravel-echo'
import { ref } from 'vue'

export const useChatStore = createGlobalState(() => {
  const sendingMessage = ref(false)

  const sendingAgentMessage = ref(false)

  const chatQueue = ref<IChatHistory[]>([])

  const channelInstance = ref<Broadcaster['reverb']['presence'] | null>(null)

  const action = {
    async sendMessage(payload: { body?: string; media?: File | null }) {
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
            // '6cf1cbe8-f592-46df-9e40-5ff3784c67fc',
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

    joinChat() {
      channelInstance.value =
        useWebSocketHandler().socketInstance.value?.join(
          `chat.${useInitiatorStore().initiatorData.value.customer?.chat_uid}`,
        ) || null
    },

    listenForNewMessage(
      successCallback: (e: IChatHistory) => void,
      errorCallback: (e: any) => void,
    ) {
      channelInstance.value?.listen('MessageSent', (e: IChatHistory) => {
        action.appendSingleToQueue(e).then(() => {
          successCallback(e)
        })
      })
      channelInstance.value?.error((e: any) => {
        errorCallback(e)
      })
    },

    whisperKeyPress() {
      channelInstance.value?.whisper('typing', {
        name: 'Customer',
      })
    },

    listenForAgentWhisper(
      successCallback: (e: IChatHistory) => void,
      errorCallback: (e: any) => void,
    ) {
      channelInstance.value?.listenForWhisper('typing', (e: any) => {
        successCallback(e)
      })
      channelInstance.value?.error((e: any) => {
        errorCallback(e)
      })
    },
  }

  return {
    sendingMessage,
    sendingAgentMessage,
    chatQueue,
    channelInstance,
    ...action,
  }
})
