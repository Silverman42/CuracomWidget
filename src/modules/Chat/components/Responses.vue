<template>
  <li class="cura:flex cura:w-full cura:items-end cura:gap-3">
    <img
      :src="'/img/avatar.svg'"
      class="cura:w-[32px] cura:h-[32px] cura:rounded-full cura:shrink-0 cura:object-cover cura:object-center"
      alt=""
    />

    <div class="cura:w-[80%]">
      <blockquote
        class="cura:md:p-4 cura:md:bg-[var(--client-message-color)] cura:md:rounded-[10px] cura:md:rounded-bl-none cura:md:text-black cura:md:text-sm cura:md:block cura:md:w-full"
        :style="{
          '--client-message-color': '#EDEFF2',
        }"
      >
        <p class="cura:mb-3">Hey 👋</p>
        <p>
          This is what the chat widget looks like to a customer on your website, please fill in the
          required fields to continue.
        </p>
      </blockquote>
      <time class="cura:text-xs cura:text-body-15 cura:block cura:mt-2"> 10:12 AM </time>
    </div>
  </li>
</template>
