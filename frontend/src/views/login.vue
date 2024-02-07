<script setup>
   import { ref, computed } from 'vue'
import router from '../router';
import {monumentsListReady, poisListReady, imageListisReady, imagesMonumentListReady, imagesMiss_FactListReady, missFactsListReady } from '../use/useData.js'
   const formData = ref ({
     email: "",
     firstName:"",
     name:"",
     password: "",
   })
   const confirmpassword = ref("")
   const showPasswordInput = ref(false)
   const errorLogin = ref(false)
   const errorCreateAccount = ref(false)
   const isEmailValid = computed ( () => {
     const re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
     return re.test(formData.value.email)
   })
 
   const isPassWordValid = computed ( () => !!formData.value?.password )

   const isNameValid = computed ( () => !!formData.value?.name )
   const isFirstnameValid = computed ( () => !!formData.value?.firstName )

   const isFormValid = computed ( () => {
     return !(isEmailValid.value && isPassWordValid.value && (!showPasswordInput.value ||  (confirmpassword.value===formData.value.password && isNameValid.value && isFirstnameValid.value)))
   })
 
   
 async function submitForm() {
   // Les options par défaut sont indiquées par *
   const urlFecth = showPasswordInput.value ? "/api/sign-in ": "/api/authentification"
   const response = await fetch(urlFecth, {
     method: "POST", // *GET, POST, PUT, DELETE, etc.
     mode: "cors", // no-cors, *cors, same-origin
     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
     credentials: "same-origin", // include, *same-origin, omit
     headers: {
       "Content-Type": "application/json",
       // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     redirect: "follow", // manual, *follow, error
     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
     body: JSON.stringify(formData.value ), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
   }); 
   if (response.ok)
   {
    showPasswordInput.value = false
    errorCreateAccount.value = false
    errorLogin.value = false
    monumentsListReady.value = false
    poisListReady.value = false
    imageListisReady.value = false
    imagesMonumentListReady.value = false
    imagesMiss_FactListReady.value = false
    missFactsListReady.value = false
    router.push('map/')
   }
   else
   {
    if (showPasswordInput.value)
    {
     errorCreateAccount.value = true
    }
    else
    {
      errorLogin.value = true
    }
   }
 }

 function handleClickCreateAcc() {
  showPasswordInput.value = true
}
 </script>


<template>
  
   <div class="flex flex-col w-fit m-auto">
    <h1 v-if="showPasswordInput" class="text-center font-bold inline-block"> Create Account </h1>
  <h1 v-else class="text-center font-bold"> Login </h1>
    <div   v-if="showPasswordInput" class="flex justify-between">
       <input class="border m-3" type="email" v-model="formData.name" placeholder="Nom" name="nom">
     </div>
     <div   v-if="showPasswordInput" class="flex justify-between">
       <input class="border m-3" type="email" v-model="formData.firstName" placeholder="Prenom" name="prenom">
     </div>
     <div class="flex justify-between">
       <input class="border m-3" type="email" v-model="formData.email" placeholder="Email" name="email">
     </div>
     <div class="flex justify-between">
       <input class="border m-3" type="password" v-model="formData.password" placeholder="password" name="description">
     </div>
     <div  v-if="showPasswordInput " class="flex justify-between">
       <input class="border m-3" type="password" v-model="confirmpassword" placeholder="confirm password" name="description">
     </div>
     <span  v-else-if="!errorLogin &&  !errorCreateAccount" class="pb-4 flex justify-end">
      <span class="text-blue-500 hover:bg-gray-200 transition-colors duration-300 cursor-pointer" @click="handleClickCreateAcc()">Create Account</span>
    </span>
    <span  v-if="errorLogin" class="pb-4 flex justify-end">
      <span class="text-red-500 transition-colors duration-300 cursor-pointer">An error has occured. Check your email and your password.</span>
    </span>
    <span  v-if="errorCreateAccount" class="pb-4 flex justify-end">
      <span class="text-red-500 transition-colors duration-300 cursor-pointer">An error has occured. Try again.</span>
    </span>
     <div class="flex justify-end">
       <button @click="submitForm" :disabled="isFormValid" class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200" type="submit">Valider</button>
     </div>
   </div>
 </template>
 
 