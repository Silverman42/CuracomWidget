<script setup lang="ts">
import { ref } from 'vue'
import IconAttachCircle from '@/components/icons/IconAttachCircle.vue'
import IconDocuments from '@/components/icons/IconDocuments.vue'
import IconPhotos from '@/components/icons/IconPhotos.vue'

const fileSelectOpen = ref(false)

const optionSelector = ref<HTMLUListElement | null>(null)

const emits = defineEmits(['fileSelected'])

const isOutsideDialog = (clientX: number, clientY: number): boolean => {
  if (!optionSelector.value) return false

  const dialogDimensions = optionSelector.value.getBoundingClientRect()
  return (
    clientX < dialogDimensions.left ||
    clientX > dialogDimensions.right ||
    clientY < dialogDimensions.top ||
    clientY > dialogDimensions.bottom
  )
}

const handleOutsideClick = (e: MouseEvent) => {
  try {
    if (isOutsideDialog(e.clientX, e.clientY)) {
      fileSelectOpen.value === true && toggleFileSelect()
    }
  } catch (error) {}
}

const toggleFileSelect = () => {
  fileSelectOpen.value = !fileSelectOpen.value
}

const handleFileSelect = (e: Event, type: 'img' | 'doc' = 'doc') => {
  const file = (e.target as HTMLInputElement).files?.[0]
  file &&
    emits('fileSelected', {
      file,
      type,
    })
}

defineExpose({
  handleOutsideClick,
})
</script>
<template>
  <div
    ref="optionSelector"
    class="cura:inline-block cura:h-[22px] cura:relative cura:w-auto cura:z-40"
  >
    <Transition name="zoom" mode="out-in">
      <ul
        v-if="fileSelectOpen"
        class="cura:absolute cura:translate-y-[-110%] cura:rounded-[12px] cura:left-0 cura:inline-flex cura:flex-col cura:gap-4 cura:w-auto cura:bg-white cura:shadow-2xl cura:border cura:border-[#F3F4F7] cura:z-[1200] cura:py-4 cura:pl-4 cura:pr-5"
      >
        <li>
          <label
            class="cura:flex cura:gap-2 cura:items-center cura:text-body-15 cura:cursor-pointer cura:hover:text-[var(--text-color)]"
            :style="{
              '--text-color': '#0C38F0',
            }"
            for="photo-upload"
          >
            <input
              type="file"
              name=""
              @change="handleFileSelect($event, 'img')"
              accept=".jpg,.png,.wav"
              class="cura:sr-only"
              id="photo-upload"
            />
            <i class="cura:inline-block cura:shrink-0">
              <IconPhotos :size="20.8"></IconPhotos>
            </i>
            <span class="cura:font-medium cura:whitespace-nowrap">Photos and Videos</span>
          </label>
        </li>

        <li>
          <label
            class="cura:flex cura:gap-2 cura:items-center cura:text-body-15 cura:cursor-pointer cura:hover:text-[var(--text-color)]"
            :style="{
              '--text-color': '#0C38F0',
            }"
            for="document-upload"
          >
            <input
              type="file"
              name=""
              @change="handleFileSelect($event, 'doc')"
              accept=".jpg,.pdf,.png,.csv,.wav,.docx,.mp3"
              class="cura:sr-only"
              id="document-upload"
            />
            <IconDocuments :size="20.8"></IconDocuments>
            <span class="cura:font-medium">Document</span>
          </label>
        </li>

        <!-- note -->
        <li class="cura:text-right cura:text-xs cura:text-body-10 w-full">Max. file size: 6MB</li>
        <!-- note end-->
      </ul>
    </Transition>

    <button
      @click="toggleFileSelect"
      class="cura:text-body-15 cura:hover:text-black cura:cursor-pointer relative"
    >
      <IconAttachCircle :size="20.8"></IconAttachCircle>
    </button>
  </div>
</template>
