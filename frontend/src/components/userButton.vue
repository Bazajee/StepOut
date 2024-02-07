<script setup>


import { removeJwtAuthCookie } from "../use/useAuth.js"
</script>

<template>
    <div class="w-1/6">
        <div class="flex w-11 " id="filterButton">
         <button @click="removeJwtAuthCookie" class=" h-full w-full flex justify-center rounded-lg  hover:border-solid hover:border-2 hover:border-transparent z-40" >
            <img src="/src/assets/person-simple-walk-thin-svgrepo-com(5).svg" alt="">
         </button>
      </div>
    </div>
</template>