<script setup lang="ts">
import { ref } from 'vue'
import NewChatForm from '@/modules/NewUser/components/Form.vue'
import ChatContainer from '@/modules/Chat/components/Container.vue'
import IconNewChat from './components/icons/IconNewChat.vue'

const chatIsOpen = ref(false)
</script>

<template>
  <div class="cura:w-svw cura:h-svh cura:bg-[#2927a9]">
    <Teleport to="body">
      <div
        class="cura:w-auto cura:h-auto cura:z-50 cura:fixed cura:bottom-4 cura:right-4 cura:font-body"
      >
        <!-- user entry form end -->
        <!-- <NewChatForm></NewChatForm> -->
        <!-- user entry form end -->

        <!-- chat body -->
        <ChatContainer></ChatContainer>
        <!-- chat body -->

        <!-- chat trigger button -->
        <button
          class="cura:w-18.5 cura:ml-auto cura:h-18.5 cura:rounded-full cura:bg-[var(--cura-open-chat-btn)] cura:flex cura:items-center cura:justify-center cura:cursor-pointer cura:text-white cura:hover:brightness-80"
          :style="{ '--cura-open-chat-btn': '#6666FF' }"
        >
          <IconNewChat :size="36"></IconNewChat>
        </button>
        <!-- chat trigger button end-->
      </div>
    </Teleport>
  </div>
</template>
