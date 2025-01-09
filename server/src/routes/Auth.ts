import express from "express";
import { register } from "../controllers/auth/register";
import { login } from "../controllers/auth/login";
import { clearUsersFromDatabase } from "../controllers/util/deleteUser";
import {getAllUsers} from "../controllers/util/getAllUsers"

const AuthRouter = express.Router();

AuthRouter.route("/register").post(register)
AuthRouter.route("/login").post(login)
AuthRouter.route("/dev").delete(clearUsersFromDatabase).get(getAllUsers)

export default AuthRouter