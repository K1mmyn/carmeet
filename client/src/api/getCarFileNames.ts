import { API_URL } from "./util"

export const getCarFileNames = async (vinNumber:string) => {
   const response = await fetch(`${API_URL}/car/filename/${vinNumber}`)
   return response.json()
}