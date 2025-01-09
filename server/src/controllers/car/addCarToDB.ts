import {Response, Request} from "express"
import Car from "../../CarModel"

export const addCarToDB = async (req, res) => {
  const { vinNumber, modelName, carMake, odometer, address, fuelType } = req.query;
  const carImages = req.files;
  const modelYear: number = req.query.modelYear;

  if (!vinNumber || !modelName || !carMake || !carImages || !modelYear) {
    return res.status(404).json({ message: "Please provide required information" });
  }

  let carImagePaths: string[] = [];
  let carImageFileNames: string[] = [];

  await carImages.map((car) => {
    carImagePaths.push(car.path);
    carImageFileNames.push(car.filename);
  });

  const newCar = await Car.create({
    carImageFileNames: carImageFileNames,
    carImagePaths: carImagePaths,
    carMake: carMake,
    modelName: modelName,
    modelYear: modelYear,
    vinNumber: vinNumber,
    address: address,
    fuelType: fuelType,
    odometer: odometer,
  });

  if (!newCar) {
    return res.status(404).json({ message: "Unable to upload car to DB" });
  }
  return res.status(200).json({ message: "Succefully uploaded car to DB" })}