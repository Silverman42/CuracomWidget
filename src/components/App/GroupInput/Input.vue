<script lang="ts" setup>
const value = defineModel({
  type: String,
  required: true,
  default: '',
})

const props = withDefaults(
  defineProps<{
    type?: string
  }>(),
  {
    type: 'text',
  },
)
</script>
<template>
  <input class="input cura:appearance-none" v-model="value" :type="props.type" />
</template>
<style lang="css" scoped>
@reference "@/assets/main.css";
.input {
  @apply cura:h-14 cura:w-full cura:flex-grow cura:border cura:border-[#E4E5EC] cura:p-2 cura:px-4 cura:outline-0 cura:hover:border-primary-600 cura:hover:ring-4 cura:hover:ring-primary-100 cura:focus:border-primary-600 cura:focus:ring-4 cura:focus:ring-primary-100;
}
</style>
