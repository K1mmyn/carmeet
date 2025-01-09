import { Request, Response } from "express";
import User from "../../UserModel"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config(); 


export const createAccessToken = (payload) => {
   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "60s"})
   return accessToken
}
export const createRefreshToken = (payload) => {
   const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
   return refreshToken
}



export const login = async (req: Request, res: Response) => {
   const {email, password} = req.body

   if (!email || !password) {
      return res.status(404).json({ message: "Please provide email & password" });
   }

   const user = await User.findOne({email:email})

   if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
   }

   const isMatch = await bcrypt.compare(password, user.password)

   if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
   }
   const payload = {
      email: email,
      password: user.password,
   }; 
   const accessToken = createAccessToken(payload)
   const refreshToken = createRefreshToken(payload)

   return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
};
