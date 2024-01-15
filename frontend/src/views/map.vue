<template>
   <div style="height:100vh; width:100vw">
       <l-map :use-global-leaflet="false" v-model:zoom="zoom" :center="[43.604479, 1.445260]">
       <l-tile-layer
           url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
           layer-type="base"
           name="OpenStreetMap"
       ></l-tile-layer>
       </l-map>
   </div>
</template>
 
<script setup>
   import { ref } from 'vue'
   import "leaflet/dist/leaflet.css"
   import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"

   const zoom = ref(14)
</script> 