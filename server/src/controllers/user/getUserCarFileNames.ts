import Car from "../../CarModel"
import {Request, Response} from "express"


export const getUserCarFileNames = async (req: Request, res: Response) => {
   const {vinNumber} = req.params
  try {
    const car = await Car.findOne({ vinNumber: vinNumber });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ vinNumber:vinNumber, carImageFileNames: car.carImageFileNames, name: car.modelName, year:car.modelYear, address:car.address, odometer:car.odometer, fuelType: car.fuelType });
  } catch (error) {
    res.send({ error: "Unable to get image" });
  }
}