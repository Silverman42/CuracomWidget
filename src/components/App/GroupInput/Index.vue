<script lang="ts" setup>
import { ref, computed } from 'vue'
interface ContainerProps {
  label?: string
  error?: string
  for?: string
  prefix?: string
  isPassword?: boolean
  note?: string
  leftWidth?: number
  rightWidth?: number
}
const containerProps = withDefaults(defineProps<ContainerProps>(), {
  label: '',
  prefix: '',
  isPassword: false,
  passwordIsVisible: false,
  leftWidth: 40,
  rightWidth: 60,
})
const requestError = computed(() => containerProps.error || '')
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
    <div class="group-container">
      <div class="left" :style="{ width: `${containerProps.leftWidth}%` }">
        <slot name="left"></slot>
      </div>
      <div class="right" :style="{ width: `${containerProps.rightWidth}%` }">
        <slot name="right"></slot>
      </div>
    </div>
    <span v-if="requestError.length > 0" class="error">{{ requestError }}</span>
    <span
      class="note"
      v-if="(containerProps?.note || '').length > 0 && requestError.length === 0"
      >{{ containerProps.note }}</span
    >
  </div>
</template>
<style scoped>
@reference "@/assets/main.css";

.group-container {
  @apply cura:flex cura:items-stretch cura:w-full;
}

.input-container {
  @apply cura:w-full;
}

.input-container .error {
  @apply cura:text-xs cura:text-red-500 cura:block cura:mt-1;
}

.input-container .note {
  @apply cura:text-xs cura:text-body-15 cura:block cura:mt-1;
}

.group-container .left:deep(input),
.group-container .left:deep(textarea),
.group-container .left:deep(select),
.group-container .left:deep(.custom) {
  @apply cura:!rounded-l-md cura:!border-r-0;
}

.group-container .right:deep(input),
.group-container .right:deep(textarea),
.group-container .right:deep(select),
.group-container .right:deep(.custom) {
  @apply cura:!rounded-r-md;
}
</style>
