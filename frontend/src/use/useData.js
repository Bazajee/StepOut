import { ref, computed } from "vue"


const  id2monument = ref({})
const monumentsListReady = ref(false)

// Computed property to get all monuments
export const monuments = computed(() => {
    // If the monument list data is ready, return all monuments as an array
    if (monumentsListReady.value) {
        return Object.values(id2monument.value)
    }
    
    // If the monument list data is not ready, fetch it from the API
    fetch('/api/monument', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(monumentlist => {
            console.log(monumentlist)
            // Populate the id2monument reference with fetched monument data
            for (const monument of Object.values(monumentlist)) {
                id2monument.value[monument.poi_id] = monument
            }
            // Set monumentList to true to indicate that the data is ready
            monumentsListReady.value = true
        })
    // Return null while waiting for the data to be fetched
    return null
})