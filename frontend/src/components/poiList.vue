<template>

<template v-for="poi in pois" >
    <l-marker :lat-lng="[poi.position.lat, poi.position.lon]" @click="setSelectedMarker((Number.isInteger(poi.monument_id)? getMonumentName(poi.monument_id) : getMiscName(poi.misc_id)))">
    </l-marker>
</template>
    <div v-if="selectedMarker" class="bottom-banner absolute bottom-0 z-[1500] bg-gray-700 w-full justify-center flex flex-col items-center">
        <img v-if="url_image_current" class="h-32 w-32" :src="url_image_current" alt="">
        <span class="text-white">{{ selectedMarker }}</span>
    </div>


 </template>
 <style>
 /* Styles pour le bandeau en bas, positionné au bas de la carte */

 </style>
 <script setup>
 import {  LMarker } from '@vue-leaflet/vue-leaflet';
 import { onMounted, ref } from 'vue'
import {pois, monuments, images, imagesMonuments} from '../use/useData.js'

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
 
    const getMonumentName = (monumentId) => {
        const monument = monuments.value.find(item => item.id == monumentId);
        url_image_current.value = getMonumentImageById(monument.id)
        return monument ? monument.name : null;
    };
 
    const getMiscName = (monumentId) => {
        const monument = Object.values(misc_factList).find(item => item.id == monumentId);
        return monument ? monument.name : null;
        };
    // Fonction pour définir le marqueur sélectionné
    const setSelectedMarker = (markerName) => {
        selectedMarker.value = markerName
    }
 </script>