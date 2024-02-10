import router from "../router";
import { userMenuState } from "../use/useStateMenu";

// Function to check auth
export const checkIsAuthenticated = async () => {
   const url = "/api/auth";
   const response = await fetch(url, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
   });
   if (response.ok) {
      return true;
   } else {
      return false;
   }
};

export function logout() {
   removeJwtAuthCookie();
   localStorage.clear();
   userMenuState.value = false
   router.push("/");
}

export function removeJwtAuthCookie() {
   document.cookie =
      "authCookie" + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
