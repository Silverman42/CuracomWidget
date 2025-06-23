<script lang="ts" setup>
import IconDocuments from '@/components/icons/IconDocuments.vue'
import IconClose from '@/components/icons/IconClose.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ media?: File | null; type?: 'doc' | 'img'; loading?: boolean }>(),
  {
    media: null,
    type: 'doc',
    loading: false,
  },
)

const uploading = computed(() => props.loading)

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} bytes`
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }
}
</script>
<template>
  <div
    class="cura:relative cura:z-3 cura:border cura:border-[#C1C3D2] cura:rounded-[8.3px] cura:p-3 cura:mb-3 cura:bg-white cura:flex cura:gap-2 cura:items-center cura:overflow-hidden"
  >
    <i
      class="cura:text-[var(--text-color)]"
      :style="{
        '--text-color': '#1010E8',
      }"
    >
      <IconDocuments v-if="props.type === 'doc'" :size="28.5"></IconDocuments>
      <IconDocuments v-else :size="28.5"></IconDocuments>
    </i>
    <div class="w-full cura:overflow-hidden cura:text-ellipsis">
      <p
        class="cura:text-black cura:font-medium cura:text-[11px] cura:whitespace-nowrap cura:text-ellipsis"
      >
        {{ props.media?.name }}
      </p>
      <p class="cura:text-body-15 cura:text-[9px]">{{ formatFileSize(props.media?.size || 0) }}</p>
    </div>

    <button
      class="cura:flex cura:shrink-0 cura:ml-auto cura:w-[22px] cura:h-[22px] cura:items-center cura:justify-center cura:text-body-15 cura:hover:text-[#000001] cura:rounded-full cura:border cura:border-body-15 cura:cursor-pointer"
      v-if="!uploading"
      @click="$emit('closeFileDetail')"
    >
      <IconClose :size="16"></IconClose>
    </button>
  </div>
</template>
