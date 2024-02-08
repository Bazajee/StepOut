<template>  
    <div v-if="userMenuState" class="mt-2 flex relative w-4/5 h-4/5">
        <div class="   rounded-lg  w-full h-full bg-white z-1500 ">
            
            <h1 class="text-indigo-900 text-5xl ">Hello {{ userData.name }}</h1>
            <p class="text-indigo-900 ">email : {{ userData.email }}</p>
            <button class=" px-2 rounded-lg bg-indigo-700" @click="handleLogout"> Log out </button>
        </div>

    </div>
</template>

<script setup>
import { logout } from "../use/useAuth.js"
import { userMenuState } from "../use/useStateMenu"

function handleLogout () {
    logout()
} 
const userStrData = localStorage.getItem('userAuth')
const userData= JSON.parse(userStrData)

</script>
