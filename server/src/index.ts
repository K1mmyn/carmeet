import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, ".env") }); 
const app = express();
import cors from "cors";
import AuthRouter from "./routes/Auth";
import UserRouter from "./routes/User";
import CarRouter from "./routes/Car";
import Car from "./CarModel"

app.use(cors({ origin: "*" }));
app.use(express.json()); 

app.use("/api/v1/auth", AuthRouter )
app.use("/api/v1/user", UserRouter )
app.use("/api/v1/car", CarRouter)
app.use("/uploads", express.static("uploads"))

app.get("/api/v1/car/:carImageFileName", async (req, res) => {
   const { carImageFileName } = req.params;

   if (!carImageFileName) {
     return res.status(404).json({ message: "Please provide filename" });
   }

   const imagePath = path.join(__dirname, "uploads", carImageFileName);

   res.sendFile(imagePath);
})

const url =
process.env.MONGO_URL ??
  "";

const port = process.env.PORT;

mongoose.connect(url).then(() => {
  console.log(`listening on ${port}`);
  app.listen(port);
});
