import { API_URL } from "./util";

export const getUsersCarWithRefreshToken = async (refreshToken:string) => {
  const response = await fetch(`${API_URL}/user/token`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return response.json();
};