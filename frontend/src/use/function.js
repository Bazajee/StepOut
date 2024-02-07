import L from "leaflet"
import { ref, watch } from "vue"

export function getDistance(from, to) {
   return L.latLng(from).distanceTo(to);
}

export const filters = ref([
      { id: 1, text: 'Main', done: true },
      { id: 2, text: 'Normal', done: true },
   ])

export const bounds = ref(null)
export const center = ref({"lat":0,"lng":0})
export const options = ref({zoomControl: false})
export const zoom = ref(16)

export const circle = ref({
   center: [0, 0],
   radius: 10,
   color: 'blue'
})

export const isLive = ref(true)

const successCallback = (position) => {
   const { latitude, longitude } = position.coords;
   circle.value.center = [latitude.toFixed(4), longitude.toFixed(4)]
   if (isLive.value) {
      center.value = circle.value.center
   }
};

const errorCallback = (error) => {
   console.log(error);
};

export const load = () => { navigator.geolocation.watchPosition(successCallback, errorCallback) }

watch(
   [center, isLive],
   () => {
   if (center.value[0] !== circle.value.center[0] || center.value[1] !== circle.value.center[1]) {
      isLive.value = false
   }
   else {
      isLive.value = true
      center.value = circle.value.center
   }
})


export function zoomUpdated(NewZoom) {
   zoom.value = NewZoom;
}

export function centerUpdated (NewCenter) {
   center.value = [NewCenter.lat.toFixed(4), NewCenter.lng.toFixed(4)];
}

export function boundsUpdated (NewBounds) {
   
   bounds.value = NewBounds;
}

export const unlocked = (currentPosition, poiPosition) => {
   const dist = getDistance(currentPosition, poiPosition)
   console.log(dist)
   if (dist < 500) {
      return true
   }
   return false
}