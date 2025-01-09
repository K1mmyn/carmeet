import express from "express";
import { addCarToUser } from "../controllers/user/addCarToUser";
import { removeCarFromUser } from "../controllers/user/removeCarFromUser";
import { getUserCars } from "../controllers/user/getUserCars";
import {Request, Response, Next } from "express";
import jwt from "jsonwebtoken"

import { createAccessToken } from "../controllers/auth/login";

const UserRouter = express.Router()

const authenicateAccessToken = (req:Request, res:Response, next:Next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader.split(' ')[1]
   if (!token) return res.status(401).json({message: "Please provide a token"})

   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.json({message: err.message})
      
   req.user = user
   next()

})}

const authenicatRefreshToken = (req: Request, res: Response, next: Next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Please provide a token" });
  
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ message: err.message });
    const payload = {
      email: user.email,
      password: user.password
    }
   const accessToken = createAccessToken(payload)
   req.accessToken = accessToken
   req.user = user;
   
   next();
  });
};

UserRouter.route("/").get(authenicateAccessToken, getUserCars)
UserRouter.route("/token").get(authenicatRefreshToken, getUserCars)
UserRouter.route("/:userId").patch(addCarToUser)
UserRouter.route("/:userId/remove").patch(removeCarFromUser)


export default UserRouter