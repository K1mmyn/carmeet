import { API_URL } from "./util"

export const removeCarFromDB = async (vinNumber:string) => {
   const response = await fetch(`${API_URL}/car`, {
      body: JSON.stringify({
         vinNumber: vinNumber
      }),
      headers: {"Content-Type": "application/json"},
      method: "DELETE",
   })

   return response.json()
}