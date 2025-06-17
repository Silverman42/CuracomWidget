import { ApiClient } from '@/utils/helpers/ApiClient'
import { ApiRoutes } from '@/utils/helpers/ApiRoutes'
import type { IResponse } from '@/utils/types/response/global'
import type { IChatHistory, ICustomer } from '@/utils/types/response/Initiator'
import { createGlobalState } from '@vueuse/core'
import type { AxiosError } from 'axios'
import { reactive, ref } from 'vue'

export interface INewUserResponse {
  customer: ICustomer
}

export const useNewUserStore = createGlobalState(() => {
  const creatingNewUser = ref(false)

  const actions = {
    async createNewUser(payload: {
      name: string
      email: string
      dial_code: string
      phone: string
    }) {
      creatingNewUser.value = true
      try {
        const { data } = await ApiClient().post<IResponse<INewUserResponse>>(
          ApiRoutes.VISITOR_IDENTIFY,
          payload,
        )
        creatingNewUser.value = false
        return data
      } catch (error) {
        creatingNewUser.value = false
        const err = error as AxiosError<IResponse>
        throw err
      }
    },
  }

  return {
    creatingNewUser,
    ...actions,
  }
})
