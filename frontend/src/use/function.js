import L from "leaflet"
import { computed, ref } from "vue"

export function getDistance(from, to) {
    return L.latLng(from).distanceTo(to);
}

export const filters = ref([
        { id: 1, text: 'Main', done: true },
        { id: 2, text: 'Normal', done: true },
    ])

export const bounds = ref(null)
export const center = ref([0, 0])
export const options = ref({zoomControl: false})
export const zoom = ref(16)

export const isLive = ref(true)

const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    circle.value.center = [latitude, longitude];
    if (isLive) {
        center.value = circle.value.center
    }
 };
 
 const errorCallback = (error) => {
    console.log(error);
 };
 
 export const load = () => {navigator.geolocation.watchPosition(successCallback, errorCallback)}


export function zoomUpdated(NewZoom) {
    zoom.value = NewZoom;
 }
 
export function centerUpdated (NewCenter) {
    center.value = NewCenter;
}

export function boundsUpdated (NewBounds) {
    
    bounds.value = NewBounds;
}


export const circle = ref({
    center: [0, 0],
    radius: 10,
    color: 'blue'
  },)


export const unlocked = (currentPosition, poiPosition) => {
    const dist = getDistance(currentPosition, poiPosition)
    if (dist < 1500) {
        return true
    }
    return false
}