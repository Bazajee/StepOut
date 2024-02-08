<template>
   <template v-for="poi in pois">
     <l-marker v-if="isMain(poi.monument_id)" :lat-lng="[poi.position.lat, poi.position.lon]"  @click="handleClick(poi, circle)">
       <l-icon :icon-size="dynamicSize(poi.monument_id)" :icon-url="iconUrl(poi, circle)"></l-icon>
     </l-marker>
   </template>
   <div v-if="selectedMarker" v-touch:swipe="onSwipeItem()" class="bottom-banner absolute bottom-0 z-[1500] bg-gray-700 w-full justify-center flex flex-col items-center">
      <img v-if="url_image_current" class="h-32 w-32 p-2 rounded-xl" :src="url_image_current" alt="">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white mr-2 mb-2 absolute top-0 right-0 cursor-pointer" stroke="currentColor" viewBox="0 0 24 24" @click="handleClosePoi">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
     <span class="text-white">{{ selectedMarker.title }}</span>
     <span v-if="showDescription" class="text-white p-2">{{ selectedMarker.description }}</span>
   </div>
 </template>
 
 <script setup>
 import { ref, computed} from 'vue';
 import { LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
 import { pois, monuments, images, imagesMonuments } from '../use/useData.js';
 import { circle, filters, unlocked } from "../use/usePosition";
 import lockedImg from '/src/assets/locked.png';
 import unlockedImg from '/src/assets/unlocked.png';

 const onSwipeItem = () => (direction) => {
   if (isUnlocked.value)
   {
      if(direction === "top"){
         showDescription.value = true
      }
      else if (direction === 'bottom'){
         showDescription.value = false
      }
   }
};
 const props = defineProps({
   zoom: Number
 });
 
 const selectedMarker = ref(false);
 const showDescription = ref(false);
 const url_image_current = ref('');
 const isUnlocked = ref(false);
 const initMonuments = monuments.value;
 const initImage = images.value;
 const initMonumentImage = imagesMonuments.value;

 const monumentIcon = ref({
   latlng: [43.60046638168462, 1.454668444693962],
   iconSize: { x: 32, y: 32 }
 });
 
 const handleClosePoi = () => {
   showDescription.value = false;
   selectedMarker.value = false
 };
 
 const handleClick = (poi, currentPosition) => {
   showDescription.value = false;
   setSelectedMarker(poi);
   isUnlocked.value = unlocked(currentPosition.center, [poi.position.lat, poi.position.lon]);
 };
 

 const iconUrl = (poi, currentPosition) => {
   const isNotLocked = unlocked(currentPosition.center, [poi.position.lat, poi.position.lon]);
   return isNotLocked ? unlockedImg : lockedImg
 }


 const getMonumentImageById = (monumentId) => {
   const image = imagesMonuments.value.find(item => item.monument_id == monumentId);
   if (!image) {
     return false;
   }
   const url_image = images.value.find(item => item.id == image.image_id);
   // Utilisez l'URL complète pour récupérer l'image du backend
   return url_image ? `/api/getImage/${url_image.url}` : false;
 };
 
 // Get Monument name and set image url
 const getMonumentName = (monumentId) => {
   const monument = monuments.value.find(item => item.id == monumentId);
   url_image_current.value = getMonumentImageById(monument.id);
   return monument ? monument.name : null;
 };
 
 const isMain = (monumentId) => {
   const monument = monuments.value.find(item => item.id == monumentId);
   const display = filters.value["0"].done && monument?.is_main || filters.value["1"].done && !monument?.is_main;
   return monument ? display : false;
 };
 
//  const initimagesMiss_Facts = imagesMiss_Facts.value;
//  const initmissFacts = missFacts.value;
//  const getMissFactImageById = (monumentId) => {
//    const image = imagesMiss_Facts.value.find(item => item.misc_fact_id == monumentId);
//    if (!image) {
//      return false;
//    }
//    const url_image = images.value.find(item => item.id == image.image_id);
//    // Utilisez l'URL complète pour récupérer l'image du backend
//    return url_image ? `api/getImage/${url_image.url}` : false;
//  };
 
//  const getMiscName = (monumentId) => {
//    const monument = missFacts.value.find(item => item.id == monumentId);
//    url_image_current.value = getMissFactImageById(monument.id);
//    return monument ? monument.name : null;
//  };
 
  // Get Monument name and set image url
  const getMonumentDescription = (monumentId) => {
   const monument = monuments.value.find(item => item.id == monumentId);
   return monument ? monument.description : null;
 };
 // Fonction pour définir le marqueur sélectionné
 const setSelectedMarker = (poi) => {
   selectedMarker.value= {}
   selectedMarker.value["title"] = getMonumentName(poi.monument_id);
   selectedMarker.value["description"] = getMonumentDescription(poi.monument_id);
 }
 
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 const dynamicSize = computed(() => (monumentId) => {
   const size_factor = 1.5;
   const monument = monuments.value.find(item => item.id == monumentId);
   const size = monument.is_main ? size_factor : 1;
   const position = {
     x: monumentIcon.value.iconSize.x * props.zoom / 20 * size,
     y: monumentIcon.value.iconSize.y * props.zoom / 20 * size,
   };
   return position;
 });
 </script>
 