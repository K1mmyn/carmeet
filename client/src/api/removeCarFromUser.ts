import { API_URL } from "./util"

export const removeCarFromUser = async (vinNumber:string , userId:string) => {
   const response = await fetch(`${API_URL}/user/${userId}/remove`, {
      method: "PATCH",
      body: JSON.stringify({
         vinNumber: vinNumber
      }),
      headers: {
         "Content-Type": "application/json"
      }
   })
   return response.json()
}