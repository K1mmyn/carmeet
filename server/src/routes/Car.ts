import express from 'express'
import { addCarToDB } from '../controllers/car/addCarToDB'
import { clearCarsFromDatabase } from '../controllers/util/deleteCar'
import { removeCarFromDB } from '../controllers/car/removeCarFromDB'

const CarRouter = express.Router()

import multer from 'multer';
import { getCarData } from '../controllers/car/getCarData'
import { getUserCarFileNames } from '../controllers/user/getUserCarFileNames'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  filFilter: function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      console.log("only jpg, jpeg & png file");
      cb(null, false);
    }    limit: {
      fileSize: 1024 * 1024 * 2;
    }
  },
});

CarRouter.route("/").delete(removeCarFromDB).post(upload.array("file[]"), addCarToDB).get(getCarData)
CarRouter.route("/dev").delete(clearCarsFromDatabase)
CarRouter.route("/filename/:vinNumber").get(getUserCarFileNames)


export default CarRouter