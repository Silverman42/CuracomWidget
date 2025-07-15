<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import NewChatForm from '@/modules/NewUser/components/Form.vue'
import ChatContainer from '@/modules/Chat/components/Container.vue'
import IconNewChat from './components/icons/IconNewChat.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { useConfigHandler } from './composables/config.handler'
import { useInitiatorStore } from './composables/initiator.store'
import { useWebSocketHandler } from './composables/websocket.handler'
import { useUrlChangeHandler } from './composables/urlChange.handler'
import { useLogPageStore } from './composables/logPage.store'
import { set } from '@vueuse/core'
import { useChatStore } from './modules/Chat/composables/chat.store'

const { config, openChat, setNewUserForm, closeChat, unsetNewUserForm } = useConfigHandler()

const { iniateChatConnect, initiatorData } = useInitiatorStore()

const { createInstance, socketInstance } = useWebSocketHandler()

const widgetIsLoaded = ref(false)

const { setLogPagePayload, logPageVisit, logPagePayload } = useLogPageStore()

const { appendManyToQueue } = useChatStore()

const checkForNewUser = () => {
  if (customerIsNew.value) {
    setNewUserForm()
  }
}

const handleNewChat = () => {
  checkForNewUser()
  openChat()
}

const customerIsNew = computed(() => {
  return initiatorData.value?.customer === null
})

const customerData = computed(() => initiatorData.value?.customer)

const handlePageLogging = () => {
  if (logPagePayload.value.url !== window.location.href) {
    setLogPagePayload()
    logPageVisit().catch(() => {})
  }
}

const detectReplaceState = () => {
  // history.pushState = function (...args) {
  //   // handlePageLogging()
  //   console.log('PushState event detected. URL changed to:', location.href)
  // }
  // window.addEventListener('popstate', () => {
  //   // handlePageLogging()
  //   console.log('Popstate event detected. URL changed to:', location.href)
  // })
  // window.addEventListener('hashchange', () => {
  //   // handlePageLogging()
  //   console.log('hashchange event detected. URL changed to:', location.href)
  // })
}

const checkUserVisibility = (uid: string) => {
  socketInstance.value?.join('me' + uid)
}

detectReplaceState()

watch(
  customerData,
  (newValue) => {
    checkUserVisibility(newValue?.uid || '')
  },
  { immediate: true, deep: true },
)

onMounted(() => {
  iniateChatConnect()
    .then(async (response) => {
      // handlePageLogging()
      await createInstance(response.data)
      await appendManyToQueue(response.data?.customer?.history || [])
      await checkForNewUser()
      widgetIsLoaded.value = true
    })
    .catch((err) => {})
})

onUnmounted(() => {
  useWebSocketHandler().disconnect()
})
</script>

<template>
  <div class="">
    <Teleport to="body">
      <div
        v-if="widgetIsLoaded"
        class="cura:w-auto cura:h-auto cura:z-1000 cura:fixed cura:font-body overflow-hidden"
        :class="{
          'cura:bottom-0 cura:right-0 cura:md:bottom-4 cura:md:right-4 ': config.isOpen,
          'cura:right-4 cura:bottom-4': !config.isOpen,
        }"
      >
        <Transition mode="out-in" name="zoom">
          <template v-if="config.isOpen">
            <div>
              <Transition name="slideInRight" mode="out-in">
                <!-- user entry form end -->
                <div class="inline-block w-auto" v-if="config.newUserFormActive">
                  <NewChatForm></NewChatForm>
                </div>
                <!-- user entry form end -->

                <!-- chat body -->
                <div class="inline-block w-auto" v-else>
                  <ChatContainer></ChatContainer>
                </div>
                <!-- chat body -->
              </Transition>

              <div class="cura:hidden cura:md:flex cura:justify-end cura:pt-5">
                <button
                  @click="closeChat"
                  class="cura:w-[32px] cura:h-[32px] cura:text-black cura:bg-white cura:rounded-full cura:flex cura:items-center cura:justify-center cura:border cura:border-[#EDEFF2]"
                >
                  <IconClose :size="20"></IconClose>
                </button>
              </div>
            </div>
          </template>

          <!-- chat trigger button -->
          <button
            v-else
            class="cura:w-18.5 cura:ml-auto cura:h-18.5 cura:rounded-full cura:bg-[var(--cura-open-chat-btn)] cura:flex cura:items-center cura:justify-center cura:cursor-pointer cura:text-white cura:hover:brightness-80"
            @click="handleNewChat"
            :style="{ '--cura-open-chat-btn': '#6666FF' }"
          >
            <IconNewChat :size="36"></IconNewChat>
          </button>
          <!-- chat trigger button end-->
        </Transition>
      </div>
    </Teleport>
  </div>
</template>
