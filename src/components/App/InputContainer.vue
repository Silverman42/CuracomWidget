<script lang="ts" setup>
import { ref, computed } from 'vue'

interface ContainerProps {
  label?: string
  error?: string
  for?: string
  prefix?: string
  isPassword?: boolean
  note?: string
  type?: string
}

const containerProps = withDefaults(defineProps<ContainerProps>(), {
  label: '',
  prefix: '',
  isPassword: false,
  passwordIsVisible: false,
})

const requestError = computed(() => containerProps.error || '')
const passwordIsVisible = ref(false)
const toggglePasswordVisibility = () => {
  passwordIsVisible.value = !passwordIsVisible.value
}
</script>
<template>
  <div class="input-container">
    <label
      v-if="containerProps.label.length > 0"
      :for="containerProps.for"
      class="cura:mb-2 cura:inline-flex cura:justify-between cura:items-end cura:w-full cura:text-sm cura:font-medium cura:text-body-black"
    >
      <p>{{ containerProps.label }}</p>
      <slot name="sidelabel"></slot>
    </label>
    <div class="input-body">
      <span class="prefix" v-if="containerProps.prefix.length > 0">
        {{ containerProps.prefix }}
      </span>
      <slot :passwordIsVisible="passwordIsVisible"> </slot>
    </div>
    <span class="error">{{ requestError }}</span>
    <span
      class="note"
      v-if="(containerProps?.note || '').length > 0 && requestError.length === 0"
      >{{ containerProps.note }}</span
    >
  </div>
</template>
<style scoped>
@reference "@/assets/main.css";

.input-container .error {
  @apply cura:text-xs cura:text-red-500 cura:block cura:mt-1;
}

.input-container .note {
  @apply cura:text-xs cura:text-body-15 cura:block cura:mt-1;
}

.input-body {
  @apply cura:flex cura:gap-2 cura:items-stretch cura:relative;
}

.input-body .prefix {
  @apply cura:border cura:inline-flex cura:items-center cura:w-auto cura:shrink-0 cura:rounded-md cura:p-2 cura:px-3 cura:text-slate-400;
}

.input-body:deep(input[type='text']),
.input-body:deep(input[type='email']),
.input-body:deep(input[type='number']),
.input-body:deep(textarea),
.input-body:deep(input[type='password']),
.input-body:deep(input[type='date']),
.input-body:deep(input[type='time']),
.input-body:deep(input[type='url']) {
  @apply cura:h-14 cura:w-full cura:flex-grow cura:rounded-md cura:border cura:border-[#E4E5EC] cura:p-2 cura:px-4 cura:outline-0 cura:hover:border-primary-600 cura:hover:ring-4 cura:hover:ring-primary-100 cura:focus:border-primary-600 cura:focus:ring-4 cura:focus:ring-primary-100;
}

.input-body .password-hide {
  @apply cura:cursor-pointer cura:inline-flex cura:items-center cura:absolute cura:z-[3] cura:top-[50%] cura:translate-y-[-50%] cura:py-2 cura:px-2 cura:right-0;
}

.input-body:deep(input[type='password']) {
  @apply cura:pr-8;
}

.input-container:deep(textarea) {
  @apply cura:h-auto;
}
</style>
