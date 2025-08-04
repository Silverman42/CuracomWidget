<script setup lang="ts">
import IconMicrophone from '@/components/icons/IconMicrophone.vue'
import IconSend from '@/components/icons/IconSend.vue'
import IconSmiley from '@/components/icons/IconSmiley.vue'
import { useConfigHandler } from '@/composables/config.handler'
import ChatResponses from '@/modules/Chat/components/Responses.vue'
import ChatHeader from '@/modules/Chat/components/Header.vue'
import ChatFileUploader from '@/modules/Chat/components/FileUploader.vue'
import ChatTypingSignal from '@/modules/Chat/components/TypingSignal.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useChatStore } from '../composables/chat.store'
import IconLoading from '@/components/icons/IconLoading.vue'
import IconMesssage from '@/components/icons/IconMesssage.vue'
import ChatFileDetails from '@/modules/Chat/components/FileDetails.vue'
import ChatErrorCard from '@/modules/Chat/components/ErrorCard.vue'
import type { AxiosError } from 'axios'
import type { IResponse } from '@/utils/types/response/global'

const {
  sendMessage,
  sendingMessage,
  chatQueue,
  appendSingleToQueue,
  joinChat,
  listenForNewMessage,
  triggerAgentmessage,
  sendingAgentMessage,
  whisperKeyPress,
  listenForAgentWhisper,
} = useChatStore()

const { config } = useConfigHandler()

const chatHistory = computed(() => chatQueue.value || [])

const messageContainer = ref<HTMLUListElement | null>(null)

const fileUploaderComp = ref<InstanceType<typeof ChatFileUploader> | null>(null)

const payload = reactive<{
  body: string
  media: File | null
}>({
  body: '',
  media: null,
})

const showFileDetails = ref(false)

const agentTyping = {
  isActive: ref(false),
  timeout: ref(0),
}

const mediaType = ref<'img' | 'doc'>('img')

const error = {
  status: ref(false),
  message: ref(''),
  timeout: ref(0),
}

const disableCustomerSendButton = computed(() => {
  return sendingMessage.value || payload.body.length <= 0
})

const setError = (message: string) => {
  error.status.value = true
  clearTimeout(error.timeout.value)
  error.message.value = message
  error.timeout.value = setTimeout(() => {
    unsetError()
  }, 7000)
}

const unsetError = () => {
  clearTimeout(error.timeout.value)
  error.status.value = false
  error.message.value = ''
}

const triggerAgentTypingSignal = () => {
  agentTyping.isActive.value = true
  clearTimeout(agentTyping.timeout.value)
  agentTyping.timeout.value = setTimeout(() => {
    agentTyping.isActive.value = false
  }, 3000)
}

const handleFileSelection = (e: { file: File; type: 'img' | 'doc' }) => {
  const fileIsValid = checkFileValidity(e.file)

  !fileIsValid.status && setError(fileIsValid.message)

  if (fileIsValid.status) {
    showFileDetails.value = true
    payload.media = e.file
    mediaType.value = e.type
  }
}

const closeFileDetails = () => {
  showFileDetails.value = false
  payload.media = null
}

const checkFileValidity = (file: File | null) => {
  if (!file) {
    return {
      status: false,
      message: 'No file selected',
    }
  }
  if (file.size > config.value.maxFileSize) {
    return {
      status: false,
      message: 'File size is too large',
    }
  }
  return {
    status: true,
    message: '',
  }
}

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

const handleChatKeyPress = (e: KeyboardEvent) => {
  whisperKeyPress()
}

const handleChatSend = () => {
  sendMessage(payload)
    .then((res) => {
      payload.body = ''
      appendSingleToQueue(res.data.data).then(() => {
        closeFileDetails()
        scrollToBottom()
      })
    })
    .catch((error) => {
      const err = error as AxiosError<IResponse>
      setError(err.response?.data.message || 'Something went wrong')
    })
}

const closeDialogueBoxes = (e: MouseEvent) => {
  fileUploaderComp.value?.handleOutsideClick(e)
}

onMounted(() => {
  getMessageContainer()

  scrollToBottom()

  joinChat()
    ?.here((e: any) => {
      // console.log('here', e)
    })
    ?.joining((e: any) => {
      // console.log('joining', e)
    })
    ?.leaving((e: any) => {
      // console.log('leaving', e)
    })

  listenForNewMessage(
    (e) => {
      scrollToBottom()
    },
    () => {},
  )

  listenForAgentWhisper(
    (e) => {
      scrollToBottom()
      triggerAgentTypingSignal()
    },
    () => {},
  )
})
</script>
<template>
  <div
    class="cura:h-svh cura:md:h-[70vh] cura:md:max-h-[643px] cura:flex cura:flex-col cura:w-svw cura:md:w-[400px] cura:bg-white cura:border cura:border-[#EDEFF2] cura:overflow-hidden cura:md:rounded-[20px] cura:relative"
    @click="closeDialogueBoxes($event)"
    id="cura-message-container"
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
        class="cura:flex cura:flex-col cura:w-full cura:gap-4 cura:overflow-y-auto cura:bg-white/50 cura:pb-43 cura:scroll-smooth cura:pr-3"
        id="messageContainer"
      >
        <ChatResponses v-for="responder in chatHistory" :responder="responder" />
        <Transition name="zoom">
          <ChatTypingSignal v-if="agentTyping.isActive.value" />
        </Transition>
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
          <!-- file viewer -->
          <Transition name="zoom">
            <ChatFileDetails
              @closeFileDetail="closeFileDetails"
              v-if="showFileDetails"
              :media="payload.media"
              :type="mediaType"
              :loading="sendingMessage"
            ></ChatFileDetails>
          </Transition>
          <!-- file viewer end-->

          <!-- Error notification -->
          <Transition name="zoom">
            <ChatErrorCard
              v-if="error.status.value"
              :message="error.message.value"
              @closeError="unsetError"
            />
          </Transition>
          <!-- Error notification end -->

          <textarea
            name=""
            rows="3"
            style="resize: none"
            @keydown="handleChatKeyPress"
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
              <!-- file uploader -->
              <ChatFileUploader
                @file-selected="handleFileSelection($event)"
                ref="fileUploaderComp"
              ></ChatFileUploader>
              <!-- file uploader end -->

              <!-- <button class="cura:text-body-15 cura:hover:text-black cura:cursor-pointer">
                <IconSmiley :size="20.8"></IconSmiley>
              </button> -->

              <!-- <button class="cura:text-body-15 cura:hover:text-black cura:cursor-pointer">
                <IconMicrophone :size="20.8"></IconMicrophone>
              </button> -->
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
                :disabled="disableCustomerSendButton"
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
