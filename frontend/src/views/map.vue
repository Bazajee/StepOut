<template>
   <div class="h-screen">
      <Live></Live>
      <l-map class="absolute z-0" :use-global-leaflet="false" :options="options" :zoom="zoom" :center="center" @ready="load" @update:zoom="zoomUpdated" @update:center="centerUpdated" @update:bounds="boundsUpdated">
         <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
         <CurrentPosition></CurrentPosition>
         <PoiList :zoom="zoom"></PoiList>
      </l-map>
      
      <div class="flex">
         <userMenuButton></userMenuButton>
         <FilterBar></FilterBar>
      </div>
      <div>
         <UserMenu></UserMenu>
      </div>
   </div>
</template>

<script setup>
   import { LCircleMarker, LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
   import { ref } from 'vue'
   import FilterBar from '../components/filterBar.vue';
   import userMenuButton from '../components/userMenuButton.vue';
   import PoiList from '../components/poiList.vue';
   import CurrentPosition from "../components/currentPosition.vue"
   import UserMenu from '../components/userMenu.vue';
   import { center, options, zoom, load, zoomUpdated, boundsUpdated, centerUpdated } from '../use/usePosition';
   import Live from "../components/live.vue"

   const url = ref('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png')
   const attribution = ref('&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors')
   
</script>