import { API_URL } from "./util"

export const register = async (username:string, email: string, password:string) => {

   console.log(username, email, password);
   
   const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
         "Content-Type": 'application/json',
      },
      body: JSON.stringify({
         username: username,
         email: email,
         password: password
      })
   })
   return response.json()
}