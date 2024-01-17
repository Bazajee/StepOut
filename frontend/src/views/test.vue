<template>
    
</template>

<script setup>
    import L from "leaflet"
    const distance = ref()

    export function getDistance() {
      const from = [43.49, 1.40]
      const to = [43.59, 1.4541]
      distance.value = L.latLng(from).distanceTo(to);
   }
   
</script>