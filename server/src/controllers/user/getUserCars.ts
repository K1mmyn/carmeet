import {Request, Response} from 'express';
import User from "../../UserModel"
import bcrypt from "bcryptjs";
import Car from "../../CarModel"

type Car = {
   vinNumber: string;
   carImageFileNames: string[];
   name: string;
   year:number;
   address:string;
   odometer: number;
   fuelType: string;
}

export const getUserCars = async (req:Request, res:Response) => {
   const { email, password } = req.user;
   const accessToken = req.accessToken

   if (!email || !password) {
      return res.status(404).json({ message: "Please provide email & password" });
   }

   const user = await User.findOne({ email: email });

   if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
   }

   if (password !== user.password) {
      return res.status(404).json({ message: "Invalid email or password" });
   }

   const userCars = await Car.find({"vinNumber": {$in: user.carsOwned}})

   const payload:Car[] = []

   userCars.map(car => payload.push({vinNumber: car.vinNumber, carImageFileNames: car.carImageFileNames, name: car.modelName, year: car.modelYear, address: car.address, odometer: car.odometer, fuelType: car.fuelType}))
   
   return res.json({userCars:payload, accessToken: accessToken, userID: user.id, username: user.username})
}