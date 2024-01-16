<template>
    <div class=" flex items-center justify-center " style="z-index: 3;">
        <ul class= "flex text-black">

            <li v-for="filter in filters" :key="filter.id" class="flex rounded-full has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200">
                <label class="flex" :for="filter.id"  >
                    <span> {{ filter.text }}</span>
                    <input :id="filter.id" type="checkbox" v-model="filter.done">
                </label>
            </li>
  
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'


const filters = ref([
  { id: 1, text: 'Monument', done: false },
  { id: 2, text: 'Misc fact', done: false },

])

</script>