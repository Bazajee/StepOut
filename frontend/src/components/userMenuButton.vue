<script setup>
    import { userMenuState } from "../use/useStateMenu"

    function handleMenuClick() {
        userMenuState.value = !userMenuState.value
    } 
</script>

<template>
    <div class="w-1/6">
        <div class="flex w-11 " id="filterButton">
         <button @click="handleMenuClick" class=" h-full w-full flex justify-center rounded-lg  hover:border-solid hover:border-2 hover:border-transparent z-40" >
            <img src="/src/assets/person-simple-walk-thin-svgrepo-com(5).svg" alt="">
         </button>
      </div>
    </div>
</template>