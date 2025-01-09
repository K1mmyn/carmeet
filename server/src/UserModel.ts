import mongoose from "mongoose";

const Scehma = mongoose.Schema

const UserScehma = new Scehma({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  carsOwned: [String],
});

const UserModel = mongoose.model("User", UserScehma);

export default UserModel