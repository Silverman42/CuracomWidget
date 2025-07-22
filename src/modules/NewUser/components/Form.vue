<script setup lang="ts">
import AppInputContainer from '@/components/App/InputContainer.vue'
import AppButton from '@/components/App/Button.vue'
import AppGroupInput from '@/components/App/GroupInput/Index.vue'
import AppGroupInputContainer from '@/components/App/GroupInput/Input.vue'
import AppGroupSelectContainer from '@/components/App/GroupInput/Select.vue'
import { useConfigHandler } from '@/composables/config.handler'
import { computed, reactive } from 'vue'
import { helpers, maxLength, minLength, required, requiredIf } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useInitiatorStore } from '@/composables/initiator.store'
import type { ICountryPhoneCode } from '@/utils/types/response/Initiator'
import { useNewUserStore } from '../composables/useNewUser.store'
import { useChatStore } from '@/modules/Chat/composables/chat.store'
import { useWebSocketHandler } from '@/composables/websocket.handler'

const { unsetNewUserForm, closeChat } = useConfigHandler()

const { initiatorData, updateCustomer } = useInitiatorStore()

const { createNewUser, creatingNewUser } = useNewUserStore()

const { createInstance } = useWebSocketHandler()

const payload = reactive({
  name: '',
  email: '',
  // dial_code: '',
  // phone: '',
})

const phoneNumberParams = reactive({
  flag: '',
  code: '',
  number_length: 0,
})

const { appendManyToQueue } = useChatStore()

const countries = computed(() => {
  return initiatorData.value?.countries || []
})

const validations = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Name is required', required),
      hasMultipleNames: helpers.withMessage('Please enter your first name and last name', () =>
        payload.name.includes(' '),
      ),
    },
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Invalid email', required),
    },
    // phone: {
    //   requiredIf: helpers.withMessage(
    //     'Phone number is required',
    //     requiredIf(() => phoneNumberParams.number_length > 0),
    //   ),
    //   minLength: helpers.withMessage(
    //     'Phone number length must be ' + phoneNumberParams.number_length + ' digits',
    //     minLength(phoneNumberParams.number_length),
    //   ),
    //   maxLength: helpers.withMessage(
    //     'Phone number length must be ' + phoneNumberParams.number_length + ' digits',
    //     maxLength(phoneNumberParams.number_length),
    //   ),
    // },
  }
})

const v$ = useVuelidate(validations, payload)

const setCountryParams = (country: ICountryPhoneCode) => {
  phoneNumberParams.flag = country.flag
  phoneNumberParams.code = country.dial_code
  phoneNumberParams.number_length = country.phone_number_length
}

const handleSelectCountry = (event: Event) => {
  const val = event.target as HTMLSelectElement
  const country = countries.value.find((country) => country.dial_code === val.value)
  setCountryParams(country as ICountryPhoneCode)
}

const handleNewChat = () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    createNewUser(payload)
      .then((res) => {
        appendManyToQueue(res.data.customer.history || []).then(() => {
          updateCustomer(res.data.customer)
          createInstance(initiatorData.value)
          unsetNewUserForm()
        })
      })
      .catch((err) => {})
  }
}
</script>
<template>
  <!-- user entry form end -->
  <form
    @submit.prevent="handleNewChat"
    class="cura:h-svh cura:md:h-auto cura:md:min-h-[509px] cura:w-svw cura:md:w-[400px] cura:bg-white cura:border cura:border-[#EDEFF2] cura:overflow-hidden cura:md:rounded-[20px]"
  >
    <!-- head -->
    <div
      class="cura:bg-[var(--cura-header-bg)] cura:p-4 cura:flex cura:justify-between cura:items-center cura:w-full"
      :style="{ '--cura-header-bg': 'black' }"
    >
      <div></div>
      <!-- <img
        :src="`${config.baseUrl}/img/cura_logo.svg`"
        class="cura:w-20 cura:h-10 cura:object-contain cura:object-center"
        alt=""
      /> -->
      <button
        @click="closeChat"
        class="cura:bg-[#FB583A] cura:p-3 cura:px-4 cura:text-white cura:text-xs cura:flex cura:items-center cura:justify-center cura:rounded-[8px] cura:whitespace-nowrap"
      >
        End chat
      </button>
    </div>
    <!-- head -->

    <div class="cura:grid cura:grid-cols-1 cura:gap-4 cura:py-4 cura:px-6">
      <h1 class="cura:text-[#808080] cura:text-[11px]">
        Kindly provide your contact information to continue
      </h1>

      <AppInputContainer
        label="Email address"
        :error="v$.email?.$errors![0]?.$message.toString() || ''"
      >
        <input
          placeholder="example@email.com"
          v-model="payload.email"
          @input="v$.email.$touch"
          type="email"
        />
      </AppInputContainer>

      <AppInputContainer :error="v$.name?.$errors![0]?.$message.toString() || ''" label="Full Name">
        <input
          placeholder="Enter full name"
          v-model="payload.name"
          @input="v$.name.$touch"
          type="text"
        />
      </AppInputContainer>

      <!-- <div>
        <AppGroupInput
          :error="v$.phone?.$errors![0]?.$message.toString() || ''"
          label="Phone Number"
          :leftWidth="40"
          :rightWidth="60"
        >
          <template v-slot:left>
            <div class="cura:w-full">
              <AppGroupSelectContainer>
                <select
                  @change="handleSelectCountry($event)"
                  v-model="payload.dial_code"
                  class="cura:w-full"
                >
                  <option
                    class="cura:uppercase"
                    v-for="country in countries"
                    :value="country.dial_code"
                  >
                    {{ country.dial_code }} ({{
                      payload.dial_code === country.dial_code ? country.iso_code : country.name
                    }})
                  </option>
                </select>
              </AppGroupSelectContainer>
            </div>
          </template>
          <template v-slot:right>
            <div class="cura:w-full">
              <AppGroupInputContainer
                @input="v$.phone.$touch"
                :type="'tel'"
                v-model="payload.phone"
              ></AppGroupInputContainer>
            </div>
          </template>
        </AppGroupInput>
      </div> -->

      <div class="cura:pt-4">
        <AppButton :loading="creatingNewUser" :block="true">Submit</AppButton>
      </div>

      <p class="cura:text-[#AAAAAA] cura:text-[11px] cura:text-center">
        Business Messenger by <strong class="cura:text-[#000001]">Curacom</strong>
      </p>
    </div>
  </form>
  <!-- user entry form end -->
</template>
