import { ref } from 'vue'

export let authUserObject = ref({})

export function removeJwtAuthCookie() {
    document.cookie = "authCookie" + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}

