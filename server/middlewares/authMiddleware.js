import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const jwtVerification = asyncHandler(async (req, res, next) => {
  try {
    const token = 
      req.cookies?.accessToken || 
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "No token provided");
    }

    console.log("token :", token);
    

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = {_id:decoded.id};

    next();
  } catch (error) {
    console.error("JWT Verification Err or ", error.message);
    throw new ApiError(
      401,
      error.message || "Not authorized, token is not valid"
    );
  }
});

export { jwtVerification };
