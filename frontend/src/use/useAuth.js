
export const parseCookie = (str) =>
  str
   .split(";")
   .map((v) => v.split("="))
   .reduce((acc, v) => {
      if (v.length === 2) {
        // Check if the array has at least two elements
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      }
      return acc
    }, {})

export function removeJwtAuthCookie() {
    document.cookie = "authCookie" + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}

console.log(document)
