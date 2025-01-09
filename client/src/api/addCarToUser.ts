import { API_URL } from "./util"

export const addCarToUser = async (vinNumber:string, userId:string) => {
   const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({vinNumber:vinNumber})
   })

   return response.json()
}