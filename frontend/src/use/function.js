import L from "leaflet"
import { ref } from "vue"

export function getDistance(from, to) {
    return L.latLng(from).distanceTo(to);
}

export const filters = ref([
        { id: 1, text: 'Main', done: true },
        { id: 2, text: 'Normal', done: true },
    ])

export const zoom = ref(16)
export const bounds = ref(null)

