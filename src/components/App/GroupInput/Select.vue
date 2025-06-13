<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
</script>

<template>
  <label class="custom">
    <slot></slot>
    <span class="cura:text-gray-400">
      <IconArrowDown :size="20"></IconArrowDown>
    </span>
  </label>
</template>
<style lang="css" scoped>
@reference "@/assets/main.css";
.custom {
  @apply cura:h-14 cura:w-full cura:flex cura:items-center cura:gap-2 cura:flex-grow cura:border;
  @apply cura:border-[#E4E5EC] cura:p-2 cura:px-4 cura:outline-0 cura:hover:border-primary-600 cura:hover:ring-4;
  @apply cura:hover:ring-primary-100 cura:focus:border-primary-600 cura:focus:ring-4 cura:focus:ring-primary-100;
}

.custom:deep(select) {
  @apply cura:appearance-none cura:bg-transparent cura:outline-0;
}
</style>
