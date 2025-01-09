import { API_URL } from "./util"

export const login = async (email:string, password:string) => {
   const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password})
   })

   return response.json()
}