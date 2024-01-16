<template>
   <div class="relative h-full w-full"> 
      <div class=" absolute top-0 z-0" style="height:100vh; width:100vw;" >
         <l-map :options="{zoomControl: false}" :use-global-leaflet="false" v-model:zoom="zoom" :center="[43.604479, 1.445260]">
            
            <l-tile-layer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" layer-type="base"
               name="OpenStreetMap"></l-tile-layer>
         </l-map>
      </div>
      <div class="" style="height:10vh; width:100vw;">
         
            <filterBar class="" ></filterBar>
         

         <!-- <FilterBar class=" hidden w-4/6  bg-white rounded-lg "></FilterBar> -->
      </div>
   </div>
</template>
 
<script setup>


import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '/src/router'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"

import filterBar from "/src/components/filterBar.vue"
// import FilterBar from "/src/components/FilterBar.vue"

const zoom = ref(14)


</script> 