import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
  addToFavouriteTvShows,
  addToFavourites,
  checkUser,
  createUser,
  getUser,
  googleLogin,
  removeFromFavourites,
} from "./controllors/user.js";
import bodyParser from "body-parser";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();
const router = express.Router();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = 5000;
const mongoUrl = process.env.MONGODB_CONNECTION_STRING;

router.post("/auth/createUser", createUser);
router.post("/auth/checkUser", checkUser);
router.post("/auth/googleLogin", googleLogin);
router.patch("/addToFavourites", auth, addToFavourites);
router.patch("/addToFavouriteTvShows", auth, addToFavouriteTvShows);
router.patch("/removeFromFavourites", auth, removeFromFavourites);
router.get("/getUser", auth, getUser);

app.use("/", router);

mongoose.connect(mongoUrl).then(() => {
  app.listen(PORT);
  console.log(`Listening on port: ${PORT}`);
});
