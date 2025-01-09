import {Request, Response} from "express"
import Car from "../../CarModel"

export const getCarData = async (req: Request, res: Response) => {
   const cars = await Car.aggregate([{$sample: {size: 10}}]);
   if (!cars) {
     return res.status(404).json({ message: "No Cars in DB" });
   }


   const payload = cars.map(car => {
    return {
      vinNumber: car.vinNumber,
      carImageFileNames: car.carImageFileNames,
      year: car.modelYear,
      name: car.modelName,
      odometer: car.odometer,
      address: car.address,
      fuelType: car.fuelType,
    }
   })
   res.status(200).json(payload);
}