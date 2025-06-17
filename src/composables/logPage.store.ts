import { ApiClient } from '@/utils/helpers/ApiClient'
import { ApiRoutes } from '@/utils/helpers/ApiRoutes'
import type { IResponse } from '@/utils/types/response/global'
import { createGlobalState } from '@vueuse/core'
import type { AxiosError } from 'axios'
import { ref } from 'vue'

export const useLogPageStore = createGlobalState(() => {
  const logPagePayload = ref({
    title: '',
    url: '',
  })

  const action = {
    async logPageVisit() {
      try {
        const { data } = await ApiClient().post<IResponse>(
          ApiRoutes.LOG_PAGE_VISIT,
          logPagePayload.value,
        )
        return data
      } catch (error) {
        const err = error as AxiosError<IResponse>
        throw err
      }
    },

    setLogPagePayload() {
      logPagePayload.value.title = document.title
      logPagePayload.value.url = window.location.href
    },
  }

  return {
    ...action,
    logPagePayload,
  }
})
