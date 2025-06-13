<script setup lang="ts">
import AppInputContainer from '@/components/App/InputContainer.vue'
import AppButton from '@/components/App/Button.vue'
import AppGroupInput from '@/components/App/GroupInput/Index.vue'
import AppGroupInputContainer from '@/components/App/GroupInput/Input.vue'
import AppGroupSelectContainer from '@/components/App/GroupInput/Select.vue'
import { useConfigHandler } from '@/composables/config.handler'

const { closeChat, unsetNewUserForm, config } = useConfigHandler()
</script>
<template>
  <!-- user entry form end -->
  <form
    @submit.prevent="unsetNewUserForm"
    class="cura:h-svh cura:md:h-auto cura:md:min-h-[509px] cura:w-svw cura:md:w-[400px] cura:bg-white cura:border cura:border-[#EDEFF2] cura:overflow-hidden cura:md:rounded-[20px]"
  >
    <!-- head -->
    <div
      class="cura:bg-[var(--cura-header-bg)] cura:py-4 cura:flex cura:justify-center cura:w-full"
      :style="{ '--cura-header-bg': 'black' }"
    >
      <img
        :src="`${config.baseUrl}/img/cura_logo.svg`"
        class="cura:w-20 cura:h-10 cura:object-contain cura:object-center"
        alt=""
      />
    </div>
    <!-- head -->

    <div class="cura:grid cura:grid-cols-1 cura:gap-4 cura:py-4 cura:px-6">
      <h1 class="cura:text-[#808080] cura:text-[11px]">
        Kindly provide your contact information to continue
      </h1>

      <AppInputContainer label="Email address">
        <input placeholder="example@email.com" type="email" />
      </AppInputContainer>

      <AppInputContainer label="Full Name">
        <input placeholder="Enter full name" type="text" />
      </AppInputContainer>

      <div>
        <AppGroupInput label="Phone Number" :leftWidth="30" :rightWidth="70">
          <template v-slot:left>
            <div class="cura:w-full">
              <AppGroupSelectContainer>
                <select>
                  <option>+234</option>
                </select>
              </AppGroupSelectContainer>
            </div>
          </template>
          <template v-slot:right>
            <div class="cura:w-full">
              <AppGroupInputContainer></AppGroupInputContainer>
            </div>
          </template>
        </AppGroupInput>
      </div>

      <div class="cura:pt-4">
        <AppButton :block="true">Submit</AppButton>
      </div>

      <p class="cura:text-[#AAAAAA] cura:text-[11px] cura:text-center">
        Business Messenger by <strong class="cura:text-[#000001]">Curacom</strong>
      </p>
    </div>
  </form>
  <!-- user entry form end -->
</template>
