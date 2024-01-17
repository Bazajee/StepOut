<template  >
   <l-marker v-if="iconIsVisible" :lat-lng="monumentIcon.latlng">
      <l-icon :icon-size="dynamicSize" :icon-url="monumentIcon.iconUrl"></l-icon>
   </l-marker>
</template>

<script setup>

import { LCircleMarker, LMarker, LMap, LTileLayer, LIcon } from '@vue-leaflet/vue-leaflet'
import { computed, reactive, ref, watch } from 'vue'



const props = defineProps({
   zoom: ref(Number)
})


const pointMonument = ref({
   center: [0, 0],
   radius: 1,
   color: 'black'
},)

const pointMiscFact = ref({
   center: [0, 0],
   radius: 1,
   color: 'green'
},)

const monumentIcon = ref({
   latlng: ref([43.60046638168462, 1.454668444693962]),
   iconUrl: ref("/src/assets/bank.svg"),
   iconSize: ref({ x: 32, y: 32 })


})

let iconIsVisible = ref(true)
reactive


const dynamicSize = computed( () =>  ({
  x: monumentIcon.value.iconSize.x * props.zoom / 20,
  y: monumentIcon.value.iconSize.y * props.zoom / 20
}));






</script>

