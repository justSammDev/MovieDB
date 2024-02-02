import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const jti = req.headers.authorization.split(" ")[1];
    let decodedData;
    decodedData = jwt.verify(jti, "test");
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
