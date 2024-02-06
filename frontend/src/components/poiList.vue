<template>
   <template v-for="poi in pois" >
      <l-marker v-if="isMain(poi.monument_id)" :lat-lng="[poi.position.lat, poi.position.lon]"  @click="setSelectedMarker((Number.isInteger(poi.monument_id) ? getMonumentName(poi.monument_id) : getMiscName(poi.misc_id)))">
         <l-icon :icon-size="dynamicSize" :icon-url="monumentIcon.iconUrl" disabled></l-icon>
      </l-marker>
   </template>
   <div v-if="selectedMarker" class="bottom-banner absolute bottom-0 z-[1500] bg-gray-700 w-full justify-center flex flex-col items-center">
      <img v-if="url_image_current" class="h-32 w-32" :src="url_image_current" alt="">
      <span class="text-white">{{ selectedMarker }}</span>
   </div>
</template>

<script setup>
   import { LMarker, LIcon} from '@vue-leaflet/vue-leaflet';
   import { onMounted, ref, computed} from 'vue'
   import { pois, missFacts, imagesMiss_Facts, monuments, images, imagesMonuments} from '../use/useData.js'
   import { filters } from "../use/function"
   import bank from '/src/assets/bank.svg'
   
   const selectedMarker = ref(null)
   const url_image_current = ref('')
   const initMonuments = monuments.value
   const initImage = images.value
   const initMonumentImage = imagesMonuments.value

   const getMonumentImageById = (monumentId) => {
      const image = imagesMonuments.value.find(item => item.monument_id == monumentId);
      if (!image)
         {
            return false
         }
      const url_image = images.value.find(item => item.id == image.image_id);
      // Utilisez l'URL complète pour récupérer l'image du backend
      return url_image ? `api/getImage/${url_image.url}` : false;
   };

   // Get Monument name and set image url
   const getMonumentName = (monumentId) => {
      const monument = monuments.value.find(item => item.id == monumentId);
      url_image_current.value = getMonumentImageById(monument.id)
      return monument ? monument.name : null;
   };

   const isMain = (monumentId) => {
      const monument = monuments.value.find(item => item.id == monumentId);
      const display = filters.value["0"].done && monument?.is_main || filters.value["1"].done && !monument?.is_main
      return monument ? display : false;
   };


   const initimagesMiss_Facts = imagesMiss_Facts.value
   const initmissFacts = missFacts.value
   const getMissFactImageById = (monumentId) => {
      const image = imagesMiss_Facts.value.find(item => item.misc_fact_id == monumentId);
      if (!image)
      {
         return false
      }
      const url_image = images.value.find(item => item.id == image.image_id);
      // Utilisez l'URL complète pour récupérer l'image du backend
      return url_image ? `api/getImage/${url_image.url}` : false;
   };

   const getMiscName = (monumentId) => {
      const monument = missFacts.value.find(item => item.id == monumentId);
      url_image_current.value = getMissFactImageById(monument.id)
      return monument ? monument.name : null;
   };

   

      
   // Fonction pour définir le marqueur sélectionné
   const setSelectedMarker = (markerName) => {
      selectedMarker.value = markerName
   }

   
   
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   const props = defineProps({
      zoom: ref(Number)
   })



   const monumentIcon = ref({
      latlng: ref([43.60046638168462, 1.454668444693962]),
      iconUrl: ref(bank),
      iconSize: ref({ x: 32, y: 32 })


   })

   let iconIsVisible = ref(true)



   const dynamicSize = computed( () =>  ({
   x: monumentIcon.value.iconSize.x * props.zoom / 20,
   y: monumentIcon.value.iconSize.y * props.zoom / 20
   }));



</script>