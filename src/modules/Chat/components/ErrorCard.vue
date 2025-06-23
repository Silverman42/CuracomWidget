<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
const props = defineProps<{ message: any }>()
</script>
<template>
  <div
    class="cura:relative cura:z-3 cura:border cura:border-red-100 cura:rounded-[8.3px] cura:p-3 cura:mb-3 cura:bg-red-50 cura:flex cura:gap-2 cura:items-center cura:justify-between"
  >
    <p
      class="cura:text-red-400 cura:font-medium cura:text-[11px] cura:whitespace-nowrap cura:text-ellipsis cura:w-[70%]"
    >
      {{ props.message }}
    </p>
    <button
      class="cura:flex cura:ml-auto cura:w-[22px] cura:h-[22px] cura:items-center cura:justify-center cura:text-red-400 cura:hover:text-red-600 cura:rounded-full cura:border cura:border-red-400 cura:cursor-pointer"
      @click="$emit('closeError')"
    >
      <IconClose :size="16"></IconClose>
    </button>
  </div>
</template>
