import L from "leaflet"

export function getDistance(from, to) {
    return L.latLng(from).distanceTo(to);
}