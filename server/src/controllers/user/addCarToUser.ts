import {Request, Response} from "express"
import User from "../../UserModel"

export const addCarToUser = async (req: Request, res: Response) => {
   const { userId } = req.params;
   const {vinNumber} = req.body

   if (!userId) {
      return res.status(404).json({ message: "Please provide a user ID" });
   }

   if (!vinNumber) {
      return res.status(404).json({ message: "Please VIN numberr" });
   }

   const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.carsOwned.push(vinNumber)
    await user.save();

   return res.status(200).json({user: user });
}