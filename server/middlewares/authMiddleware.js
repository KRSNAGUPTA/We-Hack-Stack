import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const jwtVerification = async (req, res, next) => {
  try {
    // Check for token in cookies first (preferred method)
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login."
      });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find user based on decoded token
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
      console.log("User not found with token ID:", decodedToken._id);
      return res.status(401).json({
        success: false,
        message: "Invalid token or user not found"
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.log("JWT Error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    } else if (error.name === 'TokenExpiredError') {
      console.log("Token expired");
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }
    
    console.log("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};
