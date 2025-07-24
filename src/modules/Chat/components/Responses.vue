<script setup lang="ts">
import { useConfigHandler } from '@/composables/config.handler'
import { MessageType, SenderType, type IChatHistory } from '@/utils/types/response/Initiator'

const { config } = useConfigHandler()

const props = withDefaults(defineProps<{ responder: IChatHistory | null }>(), {
  responder: null,
})
</script>
<template>
  <li class="cura:flex cura:flex-col cura:gap-1 cura:w-full">
    <div
      class="cura:flex cura:w-full cura:items-end cura:gap-3"
      :class="{
        'cura:!flex-row-reverse': props.responder?.sender === SenderType.CUSTOMER,
      }"
    >
      <img
        v-if="props.responder?.sender === SenderType.AGENT"
        :src="props.responder?.avatar || `${config.baseUrl}/img/avatar.svg`"
        class="cura:w-[32px] cura:h-[32px] cura:rounded-full cura:shrink-0 cura:object-cover cura:object-center"
        alt=""
      />

      <img
        v-else
        :src="`${config.baseUrl}/img/avatar.svg`"
        class="cura:w-[32px] cura:h-[32px] cura:rounded-full cura:shrink-0 cura:object-cover cura:object-center"
        alt=""
      />

      <div
        class="cura:inline-flex cura:flex-col cura:max-w-[80%]"
        :class="{
          'cura:items-end': props.responder?.sender === SenderType.CUSTOMER,
          'cura:items-start': props.responder?.sender === SenderType.AGENT,
        }"
      >
        <!-- text response -->
        <blockquote
          v-if="
            props.responder?.type === MessageType.TEXT ||
            props.responder?.type === MessageType.IMAGE_TEXT
          "
          class="cura:p-4 cura:bg-[var(--client-message-color)] cura:rounded-[10px] cura:text-black cura:text-sm cura:inline-block cura:w-auto"
          :style="{
            '--client-message-color':
              props.responder?.sender === SenderType.CUSTOMER ? '#FFECCF' : '#EDEFF2',
          }"
          :class="{
            'cura:rounded-br-none': props.responder?.sender === SenderType.CUSTOMER,
            'cura:rounded-bl-none': props.responder?.sender === SenderType.AGENT,
          }"
        >
          <p class="cura:pt-0">
            {{ props.responder?.body }}
          </p>
        </blockquote>
        <!-- text response -->

        <!-- file response -->
        <div
          v-if="props.responder?.media !== null"
          class="cura:w-[200px] cura:mt-2 cura:p-2 cura:bg-[var(--client-message-color)] cura:rounded-[10px] cura:text-sm"
          :style="{
            '--client-message-color':
              props.responder?.sender === SenderType.CUSTOMER ? '#FFECCF' : '#EDEFF2',
          }"
          :class="{
            'cura:rounded-br-none': props.responder?.sender === SenderType.CUSTOMER,
            'cura:rounded-bl-none': props.responder?.sender === SenderType.AGENT,
          }"
        >
          <div
            v-if="props.responder?.type === MessageType.ATTACHMENT"
            class="cura:flex cura:gap-2 cura:items-center cura:w-full"
          >
            <div
              class="cura:bg-white/40 cura:w-full cura:p-2 cura:rounded-[6px] cura:flex cura:gap-2"
            >
              <div>
                <h6 class="text-sm">Uploaded file</h6>
                <p class="cura:text-[11px] cura:text-body-15 cura:capitalize">
                  {{ props.responder?.type }}
                </p>
              </div>
            </div>
          </div>

          <a
            v-if="
              props.responder?.type === MessageType.IMAGE_TEXT ||
              props.responder?.type === MessageType.IMAGE
            "
            target="_blank"
            class="cura:w-full cura:block"
            :href="props.responder?.media"
          >
            <img :src="props.responder?.media" class="cura:w-full cura:rounded-[6px]" alt="" />
          </a>
        </div>
        <!-- file response end-->
        <time class="cura:text-xs cura:text-body-15 cura:block cura:mt-2">
          {{ props.responder?.time }}
        </time>
      </div>
    </div>
  </li>
</template>
