import { API_URL } from "./util"

export const getCarDataFromDB = async () => {
   const response = await fetch(`${API_URL}/car`)
   return response.json()
}