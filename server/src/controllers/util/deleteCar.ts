import { Request, Response } from "express";
import Car from "../../CarModel";

export const clearCarsFromDatabase = async (req: Request, res: Response) => {
  const cars = await Car.deleteMany({});

  return res.status(200).json(cars);
};
