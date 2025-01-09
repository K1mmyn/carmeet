import mongoose from "mongoose";

const Scehma = mongoose.Schema;

const CarScehma = new Scehma({
  vinNumber: { type: String, required: true, unique: true },
  modelName: { type: String, required: true },
  carMake: { type: String, required: true },
  address: { type: String, required: true },
  fuelType: { type: String, required: true },
  modelYear: { type: Number, required: true },
  odometer: { type: Number, required: true },
  carImagePaths: {type: [String], required: true},
  carImageFileNames: {type: [String], required: true},
});

const UserModel = mongoose.model("Car", CarScehma);

export default UserModel;
