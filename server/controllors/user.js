import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createUser = async (req, res) => {
  const { email, userName, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  console.log(existingUser);
  if (existingUser && existingUser.email === email)
    return res.status(200).json({ message: "User already exists." });
  if (existingUser && existingUser.userName === userName)
    return res.status(200).json({ message: "User Name already exists." });

  const hashedPassword = await bcrypt.hash(password, 6);

  const newUser = new User({
    email,
    userName,
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
    favouriteMovies: [],
    favouriteTvShows: [],
  });

  try {
    await newUser.save();

    const jti = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      email: newUser.email,
      name: newUser.name,
      userName: newUser.userName,
      favouriteMovies: newUser.favouriteMovies,
      favouriteTvShows: newUser.favouriteTvShows,
      jti,
    });
  } catch (error) {
    res.status(409).json(`This is the error at creatUser: ${error}`);
  }
};

export const checkUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (!existingUser)
      return res.status(200).json({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(200).json({ message: "Invalid credentials." });

    const jti = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      name: existingUser.name,
      email: existingUser.email,
      userName: existingUser.userName,
      password: existingUser.password,
      favouriteMovies: existingUser.favouriteMovies,
      favouriteTvShows: existingUser.favouriteTvShows,
      _id: existingUser._id,
      __v: existingUser.__v,
      jti,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const googleLogin = async (req, res) => {
  const { email, userName, firstName, lastName, picture, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const jti = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      email: existingUser.email,
      name: existingUser.name,
      userName: existingUser.userName,
      _id: existingUser._id,
      __v: existingUser.__v,
      picture: existingUser.picture,
      favouriteMovies: existingUser.favouriteMovies,
      favouriteTvShows: existingUser.favouriteTvShows,
      jti,
    });
  }

  const newUser = new User({
    email,
    userName,
    password,
    name: `${firstName} ${lastName}`,
    picture,
    favouriteMovies: [],
    favouriteTvShows: [],
  });

  try {
    await newUser.save();

    const jti = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      email: newUser.email,
      name: newUser.name,
      userName: newUser.userName,
      picture: newUser.picture,
      favouriteMovies: newUser.favouriteMovies,
      favouriteTvShows: newUser.favouriteTvShows,
      jti,
    });
  } catch (error) {
    res.status(409).json(`This is the error at googleLogin: ${error}`);
  }
};

export const addToFavourites = async (req, res) => {
  const userId = req.userId;
  const { movieId } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favouriteMovies: movieId } },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Movie added to favourites", user: updatedUser });
};

export const addToFavouriteTvShows = async (req, res) => {
  const userId = req.userId;
  const { movieId } = req.body;

  try {
    let updatedUser = await User.findById(userId);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updatedUser.favouriteTvShows.includes(movieId)) {
      updatedUser.favouriteTvShows = updatedUser.favouriteTvShows.filter(
        (tvShow) => tvShow !== movieId
      );
    } else {
      updatedUser.favouriteTvShows.push(movieId);
    }

    updatedUser = await updatedUser.save();

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromFavourites = async (req, res) => {
  const userId = req.userId;
  const { movieId } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { favouriteMovies: movieId } },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Movie added to favourites", user: updatedUser });
};

export const getUser = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(200).json({ message: "User not found" });
  try {
    const user = await User.findById(userId);
    const { _id, email, userName, name, favouriteMovies, favouriteTvShows } =
      user;
    res.status(200).json({
      _id,
      email,
      userName,
      name,
      favouriteMovies,
      favouriteTvShows,
    });
  } catch (error) {
    return res.status(400).json({ message: "IDFK" });
  }
};
