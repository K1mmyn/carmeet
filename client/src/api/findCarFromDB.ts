import { API_URL } from "./util"

export const findCarFromDB = async (vinNumber:string) => {
   const response = await fetch(`${API_URL}/car/img/${vinNumber}`, {
   })
   return response.json()
}