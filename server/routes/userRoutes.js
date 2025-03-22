import { Router } from "express";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  socialLogin,
  updatePassword,
  updateUserFiles,
  updateUserTextDetails,
  refreshAccessToken,  // Add this function
} from "../controllers/userController.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { jwtVerification } from "../middlewares/authMiddleware.js";

const router = Router();

// Define your routes
router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/social/login").post(socialLogin);
// protected routes
router.route("/logout").post(jwtVerification, logoutUser);
router.route("/update-password").post(jwtVerification, updatePassword);
router.route("/update-details").post(jwtVerification, updateUserTextDetails);
router.post(
  "/update-images",
  jwtVerification,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updateUserFiles
);
router.route("/user-details").get(jwtVerification, getUserDetails);
router.get("/get-cookie", (req, res) => {
  res.send(
    `Cookie value: RefreshToken: ${req.cookies.refreshToken} AccessToken : ${req.cookies.accessToken}`
  );
});

// Add refresh token route
router.route("/refresh-token").post(refreshAccessToken);

export default router;
