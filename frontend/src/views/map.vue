<template>
   <div class=" h-screen">

      <l-map class="absolute z-0" :use-global-leaflet="false" :options="options" :zoom="zoom" :center="center" @ready="load" @update:zoom="zoomUpdated" @update="dynamicSize" @update:center="centerUpdated" @update:bounds="boundsUpdated">
         <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
         <l-circle-marker :lat-lng="circle.center" :radius="circle.radius" :color="circle.color"/>
         
         <monumentIcon :zoom="zoom" ></monumentIcon>

         <!-- <l-marker :lat-lng="monumentIcon.latlng">
            <l-icon  :icon-size="dynamicSize"  :icon-url="monumentIcon.iconUrl" ></l-icon>
         </l-marker> -->

      </l-map>
      <div class="relative h-fit  top-0 z-10 bg-slate-200">
         <span>Center: {{ center }}</span>
         <span>Zoom: {{ zoom }}</span>
         <span>Bounds: {{ bounds }}</span>
      </div>

      <div class="">
         <FilterBar></FilterBar>
      </div>
   </div>
</template>

<script setup>
   import { LCircleMarker, LMarker, LMap, LTileLayer, LIcon } from '@vue-leaflet/vue-leaflet';
   import { computed, ref } from 'vue'
   import FilterBar from '../components/filterBar.vue';
   import monumentIcon from '../components/monumentIcon.vue'
   

   const url = ref('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png')
   const attribution = ref('&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors')
   const zoom = ref(16)
   const bounds = ref(null)


   const center = ref([0, 0])
   const circle = ref({
        center: [0, 0],
        radius: 3,
        color: 'blue'
      },)

   const options = ref({zoomControl: false})
   
   const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      center.value = [latitude, longitude];
      circle.value.center = [latitude, longitude];
      console.log(latitude, longitude);
   };

   const errorCallback = (error) => {
      console.log(error);
   };

   function load() { navigator.geolocation.getCurrentPosition(successCallback, errorCallback); }


   function zoomUpdated(NewZoom) {
      zoom.value = NewZoom;
   }

   function centerUpdated (NewCenter) {
      center.value = NewCenter;
   }

   function boundsUpdated (NewBounds) {
      bounds.value = NewBounds;
   }



</script>