import { API_URL } from "./util"

export const getUsersCarWithAccessToken = async (accessToken:string) => {
   const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
         "Authorization": `Bearer ${accessToken}`
      }
   })
   return response.json()
}