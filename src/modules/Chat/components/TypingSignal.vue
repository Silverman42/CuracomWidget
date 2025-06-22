<template>
  <li class="cura:py-2">
    <div
      class="cura:inline-flex cura:w-auto cura:gap-1 cura:rounded-[8px] cura:rounded-tl-none cura:bg-[#F9F6FF] cura:p-2"
    >
      <span
        class="cura:block cura:rounded-full cura:bg-[#E5E5FF] cura:h-3 cura:w-3 cura-fade-animate"
        style="--animate-delay: 0s"
      ></span>
      <span
        class="cura:block cura:rounded-full cura:bg-[#E5E5FF] cura:h-3 cura:w-3 cura-fade-animate"
        style="--animate-delay: 0.3s"
      ></span>
      <span
        class="cura:block cura:rounded-full cura:bg-[#E5E5FF] cura:h-3 cura:w-3 cura-fade-animate"
        style="--animate-delay: 0.6s"
      ></span>
    </div>
  </li>
</template>

<style scoped>
.cura-fade-animate {
  animation: fade 0.5s ease-in-out infinite;
  animation-delay: var(--animate-delay);
}
@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
</style>
