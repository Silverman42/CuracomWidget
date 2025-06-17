import { ApiClient } from '@/utils/helpers/ApiClient'
import { ApiRoutes } from '@/utils/helpers/ApiRoutes'
import type { IResponse } from '@/utils/types/response/global'
import type { IIdentifierResponse } from '@/utils/types/response/Initiator'
import { createGlobalState } from '@vueuse/core'
import { AxiosError } from 'axios'
import { ref } from 'vue'

export const useInitiatorStore = createGlobalState(() => {
  const initiatorData = ref<IIdentifierResponse>()

  const action = {
    async iniateChatConnect() {
      try {
        const { data, status } = await ApiClient().get<IResponse<IIdentifierResponse>>(
          ApiRoutes.VISITOR_IDENTIFY,
        )
        initiatorData.value = data.data
        return data
      } catch (error) {
        const err = error as AxiosError

        // window.localStorage.removeItem(import.meta.env.VITE_WIDGET_ID)
        throw error
      }
    },
  }

  return {
    initiatorData,
    ...action,
  }
})
