import { ref, computed } from "vue";
import { zoom } from "./function";

const id2monument = ref({});
const monumentsListReady = ref(false);

// Computed property to get all monuments
export const monuments = computed(() => {
   zoom;
   // If the monument list data is ready, return all monuments as an array
   if (monumentsListReady.value) {
      return Object.values(id2monument.value);
   }

// If the monument list data is not ready, fetch it from the API
fetch("/api/monument", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .then((monumentlist) => {
         // Populate the id2monument reference with fetched monument data
         for (const monument of Object.values(monumentlist)) {
         id2monument.value[monument.id] = monument;
         }
         // Set monumentList to true to indicate that the data is ready
         monumentsListReady.value = true;
      });
   // Return null while waiting for the data to be fetched
   return [];
   });

const id2poi = ref({});
const poisListReady = ref(false);

// Computed property to get all pois
export const pois = computed(() => {
   // If the poi list data is ready, return all pois as an array
   if (poisListReady.value) {
      return Object.values(id2poi.value);
   }

// If the poi list data is not ready, fetch it from the API
fetch("/api/poi", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .then((poilist) => {
         // Populate the id2poi reference with fetched poi data
         for (const poi of Object.values(poilist)) {
         id2poi.value[poi.id] = poi;
         }
         // Set poiList to true to indicate that the data is ready
         poisListReady.value = true;
      });
   // Return null while waiting for the data to be fetched
   return null;
   });

const id2images = ref({});
const imageListisReady = ref(false);

// Computed property to get all pois
export const images = computed(() => {
   // If the poi list data is ready, return all pois as an array
   if (imageListisReady.value) {
      return Object.values(id2images.value);
   }

// If the poi list data is not ready, fetch it from the API
fetch("/api/images", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .then((imageList) => {
         // Populate the id2poi reference with fetched poi data
         for (const image of Object.values(imageList)) {
         id2images.value[image.id] = image;
         }
         // Set poiList to true to indicate that the data is ready
         imageListisReady.value = true;
      });
   // Return null while waiting for the data to be fetched
   return null;
   });

const id2imagesMonument = ref({});
const imagesMonumentListReady = ref(false);

// Computed property to get all pois
export const imagesMonuments = computed(() => {
   // If the poi list data is ready, return all pois as an array
   if (imagesMonumentListReady.value) {
      return Object.values(id2imagesMonument.value);
   }

   // If the poi list data is not ready, fetch it from the API
   fetch("/api/monumentimage", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .then((imageMonumentList) => {
         // Populate the id2poi reference with fetched poi data
         for (const imageMonument of Object.values(imageMonumentList)) {
         id2imagesMonument.value[imageMonument.id] = imageMonument;
         }
         // Set poiList to true to indicate that the data is ready
         imagesMonumentListReady.value = true;
      });
   // Return null while waiting for the data to be fetched
   return null;
   });

const id2imagesMiss_Fact = ref({});
const imagesMiss_FactListReady = ref(false);

// Computed property to get all pois
export const imagesMiss_Facts = computed(() => {
   // If the poi list data is ready, return all pois as an array
   if (imagesMiss_FactListReady.value) {
      return Object.values(id2imagesMiss_Fact.value);
   }

   // If the poi list data is not ready, fetch it from the API
   fetch("/api/missfactimage", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .then((imageMiss_FactList) => {
         // Populate the id2poi reference with fetched poi data
         for (const imageMiss_Fact of Object.values(imageMiss_FactList)) {
         id2imagesMiss_Fact.value[imageMiss_Fact.id] = imageMiss_Fact;
         }
         // Set poiList to true to indicate that the data is ready
         imagesMiss_FactListReady.value = true;
      });
   // Return null while waiting for the data to be fetched
   return null;
   });

const id2missFacts = ref({});
const missFactsListReady = ref(false);

// Computed property to get all missFacts
export const missFacts = computed(() => {
   // If the monument list data is ready, return all missFacts as an array
   if (missFactsListReady.value) {
      return Object.values(id2missFacts.value);
   }

   // If the monument list data is not ready, fetch it from the API
   fetch("/api/misc_fact", {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => response.json())
      .then((missFactslist) => {
         // Populate the id2monument reference with fetched monument data
         for (const missFact of Object.values(missFactslist)) {
         id2missFacts.value[missFact.id] = missFact;
         }
         // Set monumentList to true to indicate that the data is ready
         missFactsListReady.value = true;
      });
   // Return null while waiting for the data to be fetched
   return [];
   });
