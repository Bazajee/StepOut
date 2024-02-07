<template >
   <div class="w-5/6 flex flex-row-reverse items-center ">
      <div class="flex w-11 " id="filterButton">
         <button @click="handleClick" class=" h-full w-full flex justify-center rounded-lg  hover:border-solid hover:border-2 hover:border-transparent z-40" >
            <img src="/src/assets/list-thin-svgrepo-com.svg" alt="">
         </button>
      </div>
      <div v-if="isMenuVisible" class=" rounded-lg flex w-full z-40 bg-white justify-center items-center rounded-l no-scrollbar py-2">
         <ul class= "flex text-black rounded-lg gap-x-4">
            <li v-for="filter in filters" :key="filter.id" class="flex rounded-full has-[:checked]:bg-indigo-200 has-[:checked]:text-indigo-900 bg-gray-200 text-gray-500 px-2">
               <label class="flex gap-2" :for="filter.id"  >
                  <span> {{ filter.text }}</span>
                  <input :id="filter.id" type="checkbox" v-model="filter.done" class="hidden">
               </label> 
            </li>
         </ul>
      </div>
   </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { filters } from "../use/usePosition"

  const isMenuVisible = ref(false)

  function handleClick() {
    isMenuVisible.value = !isMenuVisible.value
  }

</script>