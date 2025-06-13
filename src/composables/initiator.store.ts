import { ApiClient } from '@/utils/helpers/ApiClient'
import { ApiRoutes } from '@/utils/helpers/ApiRoutes'
import { AxiosError } from 'axios'
import { ref } from 'vue'

const initiatorData = ref({})
export const useInitiatorStore = () => {
  const action = {
    async iniateChatConnect() {
      try {
        const { data, status } = await ApiClient().get(ApiRoutes.VISITOR_IDENTIFY)
        return data
      } catch (error) {
        const err = error as AxiosError
        window.localStorage.removeItem(import.meta.env.VITE_WIDGET_ID)
        throw error
      }
    },
  }

  return {
    initiatorData,
    ...action,
  }
}
