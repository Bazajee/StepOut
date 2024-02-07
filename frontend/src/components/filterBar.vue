<template >
   <div class="h-full w-full flex flex-row-reverse items-center">

      <div class=" flex w-11 " id="filterButton">
         <button @click="click" class="h-full w-full flex justify-center rounded-lg  hover:border-solid hover:border-2 hover:border-transparent z-40 " >
            <img src="/src/assets/list-thin-svgrepo-com.svg" alt="">
         </button>
      </div>
      <div v-if="isMenuVisible" class=" flex h-full z-40 w-5/6 bg-white justify-center items-center rounded-l overflow-x-scroll">
         <ul class= "flex  text-black rounded-lg gap-x-4">
               <li v-for="filter in filters" :key="filter.id" class="flex rounded-full hover:bg-indigo-100 has-[:checked]:bg-indigo-100 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200  ">
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
import { onMounted, ref } from 'vue'

const isMenuVisible = ref(false)





// replace with use data
const filters = ref([
  { id: 1, text: 'Monument', done: false },
  { id: 2, text: 'Misc fact', done: false },
  { id: 3, text: 'Monument', done: false },

])

function click () {
   isMenuVisible.value = !isMenuVisible.value
   console.log(isMenuVisible.value)
}

function filterBarDisplay () {
   let filterBar = document.getElementById("filterbar")
   let state = filterBar.classList.includes("hidden") 
   return console.log(filterBar.classList)
}

onMounted(() => filterBarDisplay )

</script>