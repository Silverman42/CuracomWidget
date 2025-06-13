<script setup lang="ts">
import IconAttachCircle from '@/components/icons/IconAttachCircle.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconMicrophone from '@/components/icons/IconMicrophone.vue'
import IconSend from '@/components/icons/IconSend.vue'
import IconSmiley from '@/components/icons/IconSmiley.vue'
import { useConfigHandler } from '@/composables/config.handler'
import ChatResponses from '@/modules/Chat/components/Responses.vue'
import { ref } from 'vue'

const starterText = ref('')
const { closeChat, config } = useConfigHandler()
</script>
<template>
  <div
    class="cura:h-svh cura:md:h-[643px] cura:flex cura:flex-col cura:w-svw cura:md:w-[400px] cura:bg-white cura:border cura:border-[#EDEFF2] cura:overflow-hidden cura:md:rounded-[20px]"
  >
    <!-- heading -->
    <ul
      class="cura:bg-[var(--chat-window-color)] cura:p-4 cura:flex cura:items-center cura:justify-between cura:w-full cura:gap-3"
      :style="{
        '--chat-window-color': 'black',
      }"
    >
      <li class="cura:flex cura:items-center cura:gap-2 cura:w-full cura:overflow-hidden">
        <img
          :src="`${config.baseUrl}/img/avatar.svg`"
          class="cura:w-10 cura:h-10 cura:rounded-full cura:object-cover cura:object-center"
          alt=""
        />
        <div class="cura:w-full cura:overflow-hidden">
          <h2
            class="cura:text-white cura:font-medium cura:whitespace-nowrap cura:text-ellipsis cura:text-sm cura:md:text-base cura:w-full cura:overflow-hidden"
          >
            Charles Joe
          </h2>
          <p
            class="cura:text-xs cura:text-white/50 cura:whitespace-nowrap cura:text-ellipsis cura:w-full cura:overflow-hidden"
          >
            Admin
          </p>
        </div>
      </li>

      <li class="cura:flex cura:gap-2 cura:shrink-0">
        <button
          @click="closeChat"
          class="cura:bg-[#FB583A] cura:p-3 cura:px-4 cura:text-white cura:text-xs cura:flex cura:items-center cura:justify-center cura:rounded-[8px] cura:whitespace-nowrap"
        >
          End chat
        </button>
      </li>
    </ul>
    <!-- heading end-->

    <!-- body -->
    <div
      class="cura:p-4 cura:bg-white cura:gap-3 cura:w-full cura:max-h-full cura:flex cura:flex-col cura:grow"
    >
      <p class="cura:text-right cura:text-[11px] cura:text-body-10 cura:shrink-0 cura:w-full">
        Business Messenger by
        <span class="cura:text-black cura:font-semibold cura:tracking-tight">Curacom</span>
      </p>

      <!-- message -->
      <ul class="cura:flex cura:flex-col cura:w-full cura:gap-4 cura:grow cura:overflow-y-auto">
        <ChatResponses />
        <ChatResponses />
        <ChatResponses />
        <ChatResponses />
        <ChatResponses />
        <ChatResponses />
      </ul>
      <!-- message end-->

      <!-- input -->
      <div
        class="cura:flex cura:w-full cura:flex-col cura:gap-3 cura:shrink-0 mt-auto cura:bg-white cura:mb-18"
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
            v-model="starterText"
          ></textarea>

          <div
            class="cura:absolute cura:w-full cura:h-full cura:top-0 cura:left-0 cura:border cura:border-[#C1C3D2] cura:rounded-[8.3px] cura:peer-focus:border-primary-500 cura:transition-all cura:duration-300 cura:ease-in-out"
          ></div>

          <ul class="cura:w-full cura:flex cura:items-center cura:justify-between cura:grow">
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
            <li class="cura:shrink-0">
              <button
                class="cura:w-[40px] cura:h-[40px] cura:flex cura:items-center cura:justify-center cura:bg-[var(--chat-send-button-color)] cura:text-white cura:rounded-full"
                :style="{
                  '--chat-send-button-color': 'black',
                }"
              >
                <IconSend :size="19.2"></IconSend>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <!-- input end-->
    </div>
    <!-- body end -->
  </div>
</template>
