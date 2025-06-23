<script setup lang="ts">
import { useConfigHandler } from '@/composables/config.handler'
import { useInitiatorStore } from '@/composables/initiator.store'
import { computed } from 'vue'

const { closeChat, config } = useConfigHandler()

const { initiatorData } = useInitiatorStore()

const agentData = computed(() => initiatorData.value?.customer?.agent)
</script>
<template>
  <!-- heading -->
  <ul
    class="cura:bg-[var(--chat-window-color)] cura:p-4 cura:flex cura:items-center cura:justify-between cura:w-full cura:gap-3"
    :style="{
      '--chat-window-color': 'black',
    }"
  >
    <li class="cura:flex cura:items-center cura:gap-2 cura:w-full cura:overflow-hidden">
      <img
        :src="agentData?.avatar || `${config.baseUrl}/img/avatar.svg`"
        class="cura:w-10 cura:h-10 cura:rounded-full cura:object-cover cura:object-center"
        alt=""
      />
      <div class="cura:w-full cura:overflow-hidden">
        <h2
          class="cura:text-white cura:capitalize cura:font-medium cura:whitespace-nowrap cura:text-ellipsis cura:text-sm cura:md:text-base cura:w-full cura:overflow-hidden"
        >
          {{ agentData?.name || 'Unknown Agent' }}
        </h2>
        <p
          class="cura:text-xs cura:text-white/50 cura:whitespace-nowrap cura:text-ellipsis cura:w-full cura:overflow-hidden"
        >
          {{ agentData?.title || 'Agent' }}
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
</template>
