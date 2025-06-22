import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useConfigHandler = createGlobalState(() => {
  const config = ref({
    isOpen: false,
    newUserFormActive: false,
    baseUrl: import.meta.env.VITE_BASE_URL,
    envIsProduction: import.meta.env.MODE === 'production',
  })

  const action = {
    openChat() {
      config.value.isOpen = true
    },
    closeChat() {
      config.value.isOpen = false
    },

    unsetNewUserForm() {
      config.value.newUserFormActive = false
    },
    setNewUserForm() {
      config.value.newUserFormActive = true
    },
  }

  return {
    config,
    ...action,
  }
})
