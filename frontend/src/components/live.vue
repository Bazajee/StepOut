<template>
   <button class="bg-white w-8 h-8 absolute bottom-2 right-2 z-40 flex justify-center items-center rounded-md">
      <img class="w-8 h-8" @click="updateIsLive" :src="urlImage" alt="">
   </button>
</template>

<script setup>
   import live_image from "/src/assets/posit_live.png"
   import not_live_image from "/src/assets/posit_not_live.png"
   import { computed, ref, watch } from 'vue'
   import { center, circle, isLive } from '../use/usePosition'

   const urlImage = ref(live_image)
   function updateIsLive() {
      isLive.value = true
      center.value = circle.value.center
   }

   watch(isLive,
      () => {
      isLive.value ? urlImage.value = live_image : urlImage.value = not_live_image
   })



</script>

