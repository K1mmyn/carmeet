import {Request, Response} from "express"
import Car from "../../CarModel"
import fs from "fs"

export const removeCarFromDB = async (req:Request, res: Response) => {
   const {vinNumber} = req.body

   if (!vinNumber) {
      return res.status(404).json({message: "Please provide a vin number"})
   }

   const car = await Car.findOne({vinNumber:vinNumber})
   await Car.findOneAndDelete({vinNumber:vinNumber})


   if (!car) {
      return res.status(404).json({message: "Unable to delete car"})
   }

   await car.carImagePaths.forEach(filePath => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          return;
        }

        console.log(`File ${filePath} has been successfully removed.`);
      });
   })

   return res.status(200).json({message: "Car has been successfully removed from DB!"})
}