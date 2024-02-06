<template>
   <l-circle-marker :lat-lng="circle.center" :radius="circle.radius" :color="circle.color"/>
</template>

<script setup>
   import { LCircleMarker } from '@vue-leaflet/vue-leaflet';
   import { circle } from "../use/function"
   
</script>

