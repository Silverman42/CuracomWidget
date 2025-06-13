<script lang="ts" setup>
import { computed } from 'vue'
import IconLoading from '../icons/IconLoading.vue'
interface AppButtonProp {
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  type?: 'primary' | 'secondary' | 'danger' | 'white'
  outlined?: boolean
  disabled?: boolean
  loading?: boolean
  block?: boolean
}
const appButtonProp = withDefaults(defineProps<AppButtonProp>(), {
  size: 'md',
  light: false,
  type: 'primary',
  outlined: false,
  loading: false,
  disabled: false,
  block: true,
})

const buttonIsDisabled = computed(() => appButtonProp.disabled || appButtonProp.loading)

const buttonIsLoading = computed(() => appButtonProp.loading)
</script>
<style>
@reference "@/assets/main.css";

.cura-btn {
  @apply cura:rounded-lg cura:border cura:relative cura:py-[17px] cura:px-6 cura:inline-flex cura:justify-center cura:items-center cura:gap-x-2;
}

.cura-btn--md {
  @apply cura:text-base;
}

.cura-btn--sm {
  @apply cura:text-sm;
}

.cura-btn--lg {
  @apply cura:text-lg;
}

.cura-btn--block {
  display: flex !important;
  width: 100%;
}

.cura-btn:disabled {
  @apply cura:brightness-50 cura:cursor-not-allowed;
}

.cura-btn-spinner {
  @apply cura:inline-block cura:absolute cura:left-[50%] cura:translate-x-[-50%] cura:top-[50%] cura:translate-y-[-50%] cura:z-[1];
}

.cura-btn-primary {
  @apply cura:bg-primary-500 cura:text-primary-100 cura:border-transparent cura:hover:bg-primary-700 cura:transition-all cura:duration-500 cura:ease-in-out;
}

.cura-btn-primary-light--outlined {
  @apply cura:border-primary-200 cura:text-primary-200 cura:hover:bg-primary-200 cura:hover:text-primary-700;
}

.cura-btn-primary-light {
  @apply cura:border-primary-200 cura:text-primary-700 cura:bg-primary-200 cura:hover:bg-primary-300 cura:hover:border-primary-300 cura:hover:text-primary-700 cura:transition-all cura:duration-500 cura:ease-in-out;
}

.cura-btn-primary--outlined {
  @apply cura:border cura:border-primary-700 cura:text-primary-700 cura:hover:border-primary-500 cura:hover:text-primary-500 cura:bg-transparent;
}

.cura-btn-secondary {
  @apply cura:bg-secondary cura:text-secondary cura:border-transparent cura:hover:bg-primary-700;
}

.cura-btn-secondary-light--outlined {
  @apply cura:border-secondary cura:text-secondary cura:hover:bg-secondary cura:hover:text-primary-700;
}

.cura-btn-secondary-light {
  @apply cura:border-secondary cura:text-secondary cura:bg-secondary cura:hover:bg-secondary cura:hover:border-secondary cura:hover:text-primary-700;
}

.cura-btn-danger {
  @apply cura:bg-[#FB583A] cura:text-red-100 cura:border-transparent cura:hover:bg-red-600;
}

.cura-btn-danger-light--outlined {
  @apply cura:border-red-200 cura:text-red-200 cura:hover:bg-red-200 cura:hover:text-red-600;
}

.cura-btn-danger-light {
  @apply cura:border-red-200 cura:text-red-700 cura:bg-red-200 cura:hover:bg-red-300 cura:hover:border-red-300 cura:hover:text-red-900;
}

.cura-btn-white {
  @apply cura:bg-white cura:text-black cura:border-transparent cura:hover:bg-gray-200;
}

.cura-btn-white-light--outlined {
  @apply cura:border-white cura:text-white cura:hover:bg-gray-200 cura:hover:text-gray-200;
}
</style>
<template>
  <button
    :disabled="buttonIsDisabled"
    :class="[
      'cura-btn',
      `cura-btn--${appButtonProp.size} `,
      `cura-btn-${appButtonProp.type}${appButtonProp.light ? '-light' : ''}${
        appButtonProp.outlined ? '--outlined' : ''
      } `,
      appButtonProp.block && 'cura-btn--block',
    ]"
  >
    <span
      class="cura:relative cura:z-[2]"
      :class="{
        invisible: buttonIsLoading,
      }"
    >
      <slot> Button </slot>
    </span>
    <span v-if="buttonIsLoading" class="cura-btn-spinner">
      <IconLoading :size="32"></IconLoading>
    </span>
  </button>
</template>
