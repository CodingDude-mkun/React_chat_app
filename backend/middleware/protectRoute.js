import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.send(401, "Unautorized: No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT);

    if (!decoded) {
      return res.send(401, "Unautorized: invalid token");
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.send(400, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("error in protectRoute : ", error);
    res.send(500, error);
  }
};

export default protectRoute;
