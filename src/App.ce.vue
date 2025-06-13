<script setup lang="ts">
import { ref } from 'vue'
import NewChatForm from '@/modules/NewUser/components/Form.vue'
import ChatContainer from '@/modules/Chat/components/Container.vue'
import IconNewChat from './components/icons/IconNewChat.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { useConfigHandler } from './composables/config.handler'

const chatIsOpen = ref(false)

const { config, openChat, setNewUserForm, closeChat } = useConfigHandler()

const handleNewChat = () => {
  setNewUserForm()
  openChat()
}
</script>

<template>
  <div class="">
    <Teleport to="body">
      <div
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
