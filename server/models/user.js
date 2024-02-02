import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  userName: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favouriteMovies: { type: [String] },
  favouriteTvShows: { type: [String] },
  password: {
    type: String,
    required: true,
  },
  picture: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
