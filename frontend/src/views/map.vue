<template>
   <div class="relative h-full w-full"> 
      <div class="absolute top-0" style="height:100vh; width:100vw; z-index: 2" >
         <l-map :use-global-leaflet="false" v-model:zoom="zoom" :center="[43.604479, 1.445260]">
            <l-tile-layer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" layer-type="base"
               name="OpenStreetMap"></l-tile-layer>
         </l-map>
      </div>
      <div class="flex flex-row-reverse" style="z-index: 3;height:10vh; width:100vw;">
         <div class=" h-full w-1/6 " >
            <TopLeftButton class="" ></TopLeftButton>
         </div>

         <FilterBar class="w-4/6  bg-white rounded-lg "></FilterBar>
      </div>
   </div>
</template>
 
<script setup>


import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '/src/router'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"

import TopLeftButton from "/src/components/TopLeftButton.vue"
import FilterBar from "/src/components/FilterBar.vue"

const zoom = ref(14)


</script> 