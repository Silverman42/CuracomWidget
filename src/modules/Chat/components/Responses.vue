<script setup lang="ts">
import { useConfigHandler } from '@/composables/config.handler'
import { SenderType, type IChatHistory } from '@/utils/types/response/Initiator'

const { config } = useConfigHandler()

const props = withDefaults(defineProps<{ responder: IChatHistory | null }>(), {
  responder: null,
})
</script>
<template>
  <li
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

    <div class="cura:inline-block cura:max-w-[80%]">
      <blockquote
        class="cura:p-4 cura:bg-[var(--client-message-color)] cura:rounded-[10px] cura:text-black cura:text-sm cura:block cura:w-full"
        :style="{
          '--client-message-color':
            props.responder?.sender === SenderType.CUSTOMER ? '#FFECCF' : '#EDEFF2',
        }"
        :class="{
          'cura:rounded-br-none': props.responder?.sender === SenderType.CUSTOMER,
          'cura:rounded-bl-none': props.responder?.sender === SenderType.AGENT,
        }"
      >
        <p>
          {{ props.responder?.body }}
        </p>
      </blockquote>
      <time class="cura:text-xs cura:text-body-15 cura:block cura:mt-2">
        {{ props.responder?.time }}
      </time>
    </div>
  </li>
</template>
