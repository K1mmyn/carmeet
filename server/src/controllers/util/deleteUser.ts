import { Request, Response } from "express";
import User from "../../UserModel";

export const clearUsersFromDatabase = async (req: Request, res: Response) => {
  const users = await User.deleteMany({});

  return res.status(200).json(users);
};
