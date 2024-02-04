import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const jti = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(jti, process.env.JWT_SECRET);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
