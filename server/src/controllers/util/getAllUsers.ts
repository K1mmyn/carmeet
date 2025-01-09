import { Request, Response } from "express";
import User from "../../UserModel";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  if (!users) {
    return res.status(404).json({ message: "Can not find usersd" });
  }
  res.status(200).json(users);
};
