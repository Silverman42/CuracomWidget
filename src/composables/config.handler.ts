import { ref } from 'vue'

const config = ref({
  isOpen: false,
  newUserFormActive: false,
})
export const useConfigHandler = () => {
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
}
