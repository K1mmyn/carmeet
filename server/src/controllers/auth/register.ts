import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import User from "../../UserModel"
import { createAccessToken, createRefreshToken } from "./login";


export const register = async (req: Request, res: Response) => {
   const { username, password, email } = req.body;

   if (!username || !password || !email) {
   return res.status(404).json({ message: "Please provide username, password and email" });
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
      carsOwned: []
   });

    if (!user) {
      return res.status(404).json({ message: "Failed to create user" });
    }
    const payload = {
      email: email,
      password: hashedPassword,
    }; 

   const accessToken = createAccessToken(payload);
   const refreshToken = createRefreshToken(payload);


    return res.status(200).json({ accessToken:accessToken, refreshToken: refreshToken})
};
