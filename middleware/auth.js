import jwt from "jsonwebtoken";
import { Unauthenticated } from "../errors/index.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Unauthenticated("Authentication Invalid, Please login again.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "6395d3d116dcde36541d786e";

    req.user = { userId: payload.userId, testUser };

    next();
  } catch (error) {
    throw new Unauthenticated("Authentication Invalid, Please login again.");
  }
};

export default auth;
