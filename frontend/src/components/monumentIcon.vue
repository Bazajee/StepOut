<template  >
	<l-marker v-if="iconIsVisible" :lat-lng="monumentIcon.latlng">
		<l-icon :icon-size="dynamicSize" :icon-url="monumentIcon.iconUrl"></l-icon>
	</l-marker>
</template>

<script setup>

import { LCircleMarker, LMarker, LMap, LTileLayer, LIcon } from '@vue-leaflet/vue-leaflet'
import { computed, reactive, ref, watch } from 'vue'


// don't work
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
	iconSize: ref(32)


})

let iconIsVisible = ref(true)
reactive

// don't work
watch(props.zoom, ()=> {
	if (props.zoom > 12) {  return iconIsVisible.value = true }
	else { return iconIsVisible.value = false }
});

const dynamicSize = computed( () =>  monumentIcon.value.iconSize * props.zoom/20);



</script>