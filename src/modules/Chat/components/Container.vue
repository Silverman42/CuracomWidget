<script setup lang="ts">
import IconAttachCircle from '@/components/icons/IconAttachCircle.vue'
import IconMicrophone from '@/components/icons/IconMicrophone.vue'
import IconSend from '@/components/icons/IconSend.vue'
import IconSmiley from '@/components/icons/IconSmiley.vue'
import { useConfigHandler } from '@/composables/config.handler'
import ChatResponses from '@/modules/Chat/components/Responses.vue'
import ChatHeader from '@/modules/Chat/components/Header.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useChatStore } from '../composables/chat.store'
import IconLoading from '@/components/icons/IconLoading.vue'
import IconMesssage from '@/components/icons/IconMesssage.vue'

const {
  sendMessage,
  sendingMessage,
  chatQueue,
  appendSingleToQueue,
  listenAndJoin,
  triggerAgentmessage,
  sendingAgentMessage,
} = useChatStore()

const { config } = useConfigHandler()

const chatHistory = computed(() => chatQueue.value || [])

const messageContainer = ref<HTMLUListElement | null>(null)

const payload = reactive({
  body: '',
})

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop =
      messageContainer.value.scrollTop + messageContainer.value.scrollHeight
  }
}

const getMessageContainer = () => {
  messageContainer.value = document.querySelector('#messageContainer')
}

const handleAgentMessage = () => {
  triggerAgentmessage({
    body: payload.body,
  })
    .then((res) => {
      payload.body = ''
    })
    .catch(() => {})
}

const handleChatSend = () => {
  sendMessage(payload)
    .then((res) => {
      payload.body = ''
      appendSingleToQueue(res.data.data).then(() => {
        scrollToBottom()
      })
    })
    .catch(() => {})
}

onMounted(() => {
  getMessageContainer()
  scrollToBottom()
  listenAndJoin(
    (e) => {
      scrollToBottom()
    },
    () => {},
  )
})
</script>
<template>
  <div
    class="cura:h-svh cura:md:h-[643px] cura:flex cura:flex-col cura:w-svw cura:md:w-[400px] cura:bg-white cura:border cura:border-[#EDEFF2] cura:overflow-hidden cura:md:rounded-[20px]"
  >
    <!-- heading -->
    <ChatHeader></ChatHeader>
    <!-- heading end-->

    <!-- body -->
    <div
      class="cura:p-4 cura:bg-white cura:gap-3 cura:w-full cura:h-[91%] cura:md:h-[88.5%] cura:flex cura:flex-col cura:grow-0 cura:relative"
    >
      <p class="cura:text-right cura:text-[11px] cura:text-body-10 cura:shrink-0 cura:w-full">
        Business Messenger by
        <span class="cura:text-black cura:font-semibold cura:tracking-tight">Curacom</span>
      </p>

      <!-- message -->
      <ul
        class="cura:flex cura:flex-col cura:w-full cura:gap-4 cura:overflow-y-auto cura:bg-white/50 cura:pb-43 cura:scroll-smooth"
        id="messageContainer"
      >
        <ChatResponses v-for="responder in chatHistory" :responder="responder" />
      </ul>
      <!-- message end-->

      <!-- input -->
      <div
        class="cura:flex cura:w-full cura:flex-col cura:gap-3 cura:shrink-0 mt-auto cura:bg-white cura:absolute cura:bottom-0 cura:left-0 cura:right-0 cura:p-4 z-3"
      >
        <ul class="flex items-center gap-2 overflow-x-auto pb-3">
          <!-- <li
            class="inline-block w-auto"
            v-for="starter in widgetConfig.conversatonStarters"
          >
            <button
              class="px-2 py-1.5 border border-primary-500 rounded-full text-black hover:bg-primary-50 hover:text-primary-500 transition-all duration-300 ease-in-out text-xs min-w-[10px] text-center whitespace-nowrap"
              @click="starterText = starter"
            >
              {{ starter }}
            </button>
          </li> -->
        </ul>

        <div class="cura:relative cura:rounded-[8.3px] cura:p-3">
          <textarea
            name=""
            rows="3"
            style="resize: none"
            class="cura:border-0 cura:w-full cura:outline-none cura:peer cura:relative cura:z-[3] cura:placeholder:text-[#CCCCCC]"
            placeholder="Type something"
            id=""
            v-model="payload.body"
          ></textarea>

          <div
            class="cura:absolute cura:w-full cura:h-full cura:top-0 cura:left-0 cura:border cura:border-[#C1C3D2] cura:rounded-[8.3px] cura:peer-focus:border-primary-500 cura:transition-all cura:duration-300 cura:ease-in-out"
          ></div>

          <ul
            class="cura:w-full cura:flex cura:items-center cura:justify-between cura:grow cura:relative cura:z-8"
          >
            <li class="cura:flex cura:items-center cura:gap-2">
              <button class="cura:text-body-15 cura:hover:text-black cura:cursor-pointer">
                <IconSmiley :size="20.8"></IconSmiley>
              </button>
              <button class="cura:text-body-15 cura:hover:text-black cura:cursor-pointer">
                <IconAttachCircle :size="20.8"></IconAttachCircle>
              </button>
              <button class="cura:text-body-15 cura:hover:text-black cura:cursor-pointer">
                <IconMicrophone :size="20.8"></IconMicrophone>
              </button>
            </li>
            <li class="cura:shrink-0 cura:flex cura:items-center cura:gap-2">
              <!-- agent button -->
              <button
                v-if="!config.envIsProduction"
                class="cura:w-[40px] cura:h-[40px] cura:flex cura:items-center cura:justify-center cura:bg-[var(--chat-send-button-color)] cura:text-white cura:rounded-full cura:cursor-pointer cura:disabled:opacity-50"
                @click="handleAgentMessage"
                :disabled="sendingAgentMessage"
                :style="{
                  '--chat-send-button-color': 'black',
                }"
              >
                <IconMesssage v-if="!sendingAgentMessage" :size="19.2"></IconMesssage>
                <IconLoading :size="19.2" v-else></IconLoading>
              </button>
              <!-- agent button end-->

              <!-- Customer button -->
              <button
                class="cura:w-[40px] cura:h-[40px] cura:flex cura:items-center cura:justify-center cura:bg-[var(--chat-send-button-color)] cura:text-white cura:rounded-full cura:cursor-pointer cura:disabled:opacity-50"
                @click="handleChatSend"
                :disabled="sendingMessage || payload.body.length <= 0"
                :style="{
                  '--chat-send-button-color': 'black',
                }"
              >
                <IconSend v-if="!sendingMessage" :size="19.2"></IconSend>
                <IconLoading :size="19.2" v-else></IconLoading>
              </button>
              <!-- Customer button end-->
            </li>
          </ul>
        </div>
      </div>
      <!-- input end-->
    </div>
    <!-- body end -->
  </div>
</template>
