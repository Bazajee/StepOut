<script setup>
   import { ref, computed, resolveComponent } from "vue";
   import router from "../router";
   import {
      monumentsListReady,
      poisListReady,
      imageListisReady,
      imagesMonumentListReady,
   } from "../use/useData.js";

   const formData = ref({
      email: "",
      firstName: "",
      name: "",
      password: "",
   });
   const confirmpassword = ref("");
   const createAccount = ref(false);
   const errorLogin = ref(false);
   const errorCreateAccount = ref(false);

   const isEmailValid = computed(() => {
      const re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      return re.test(formData.value.email);
   });

   const isPassWordValid = computed(() => !!formData.value?.password);
   const isNameValid = computed(() => !!formData.value?.name);
   const isFirstnameValid = computed(() => !!formData.value?.firstName);

   const isFormValid = computed(() => {
      return !(
         isEmailValid.value &&
         isPassWordValid.value &&
         (!createAccount.value ||
            (confirmpassword.value === formData.value.password &&
               isNameValid.value &&
               isFirstnameValid.value))
      );
   });

   async function submitForm() {
      const urlFecth = createAccount.value ? "/api/sign_in" : "/api/auth";    
      const response = await fetch(urlFecth, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formData.value),
      });
      if (response.ok) {
         createAccount.value = false;
         errorCreateAccount.value = false;
         errorLogin.value = false;
         monumentsListReady.value = false;
         poisListReady.value = false;
         imageListisReady.value = false;
         imagesMonumentListReady.value = false;

         const data = await response.json();
         localStorage.setItem("userAuth", JSON.stringify(data));
         router.push("/map");
      } else {
         if (createAccount.value) {
            errorCreateAccount.value = true;
         } else {
            errorLogin.value = true;
         }
      }
   }


   function handleClickCreateAcc() {
      createAccount.value = true;
   }
</script>

<template>
   <div class="flex flex-col w-fit m-auto">
      <h1 v-if="createAccount" class="text-center font-bold inline-block">
         Create Account
      </h1>
      <h1 v-else class="text-center font-bold">Login</h1>
      <div v-if="createAccount" class="flex justify-between">
         <input
            class="border m-3"
            type="email"
            v-model="formData.name"
            placeholder="Nom"
            name="nom"
         />
      </div>
      <div v-if="createAccount" class="flex justify-between">
         <input
            class="border m-3"
            type="email"
            v-model="formData.firstName"
            placeholder="Prenom"
            name="prenom"
         />
      </div>
      <div class="flex justify-between">
         <input
            class="border m-3"
            type="email"
            v-model="formData.email"
            placeholder="Email"
            name="email"
         />
      </div>
      <div class="flex justify-between">
         <input
            class="border m-3"
            type="password"
            v-model="formData.password"
            placeholder="password"
            name="description"
         />
      </div>
      <div v-if="createAccount" class="flex justify-between">
         <input
            class="border m-3"
            type="password"
            v-model="confirmpassword"
            placeholder="confirm password"
            name="description"
         />
      </div>
      <span v-else-if="!errorLogin && !errorCreateAccount"
         class="pb-4 flex justify-end">
         <span class="text-blue-500 hover:bg-gray-200 transition-colors duration-300 cursor-pointer" @click="handleClickCreateAcc()">Create Account</span>
      </span>
      <span v-if="errorLogin" class="pb-4 flex justify-end">
         <span
            class="text-red-500 transition-colors duration-300 cursor-pointer"
            >An error has occured. Check your email and your password.</span
         >
      </span>
      <span v-if="errorCreateAccount" class="pb-4 flex justify-end">
         <span
            class="text-red-500 transition-colors duration-300 cursor-pointer"
            >An error has occured. Try again.</span
         >
      </span>
      <div class="flex justify-end">
         <button
            @click="submitForm"
            :disabled="isFormValid"
            class="flex w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200"
            type="submit"
         >
            Valider
         </button>
      </div>
   </div>
</template>
