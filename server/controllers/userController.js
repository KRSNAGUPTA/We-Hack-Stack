import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/UserModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import fs from "fs";

const generateAccessandRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);

    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: true,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error while generating refresh token " + error);
    throw new ApiError(
      400,
      "Error generating access token & refresh token\n" + error.message
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  let avatarLocalPath = "";
  let coverImageLocalPath = "";

  try {
    const { email, username, fullName, password } = req.body;

    if (!email) {
      throw new ApiError(400, "Email required");
    }

    // Check if user already exists
    let user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (user) {
      throw new ApiError(409, "User already exists");
    }

    // Handle file uploads
    if (req.files) {
      if (Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
      }

      if (
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
      ) {
        coverImageLocalPath = req.files.coverImage[0].path;
      }
    }

    // Upload images to Cloudinary
    let avatar = null;
    let coverImage = null;

    if (avatarLocalPath) {
      avatar = await uploadOnCloudinary(avatarLocalPath);
      if (!avatar || !avatar.url) {
        throw new ApiError(500, "Failed to upload avatar");
      }
    }

    if (coverImageLocalPath) {
      coverImage = await uploadOnCloudinary(coverImageLocalPath);
      if (!coverImage || !coverImage.url) {
        throw new ApiError(500, "Failed to upload cover image");
      }
    }

    // Create a new user
    user = await User.create({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      fullName,
      password,
      avatar: avatar ? avatar.url : "",
      coverImage: coverImage ? coverImage.url : "",
      lastLogin: Date.now(),
    });

    // Exclude sensitive fields from response
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -__v"
    );

    if (!createdUser) {
      throw new ApiError(500, "Failed to create user");
    }

    // Generate tokens
    const tokens = await generateAccessandRefreshToken(createdUser._id);

    console.log(`${username} registered successfully\n`);
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user: createdUser, tokens },
          "User registered successfully"
        )
      );
  } catch (error) {
    // Cleanup any local files if an error occurs
    if (avatarLocalPath && fs.existsSync(avatarLocalPath)) {
      fs.unlinkSync(avatarLocalPath);
    }
    if (coverImageLocalPath && fs.existsSync(coverImageLocalPath)) {
      fs.unlinkSync(coverImageLocalPath);
    }

    return res
      .status(error.statusCode || 500)
      .json(
        new ApiError(
          error.statusCode || 500,
          error.message || "Error while registering the user"
        )
      );
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      throw new ApiError(400, "Email or username and password required");
    }

    const user = await User.findOne({
      $or: [
        { email: email?.toLowerCase() },
        { username: username?.toLowerCase() },
      ],
    });

    if (!user) throw new ApiError(400, "User not found");

    const isCorrectPassword = await user.isPasswordCorrect(password);

    if (!isCorrectPassword) {
      throw new ApiError(401, "Incorrect password");
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    console.log(`\n${loggedInUser.username} logged in successfully`);
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, tokens: { accessToken, refreshToken } },
          "User logged in successfully"
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode || 401)
      .json(new ApiError(error.statusCode || 401, error.message));
  }
});

const socialLogin = asyncHandler(async (req, res) => {
  try {
    const { email, avatar, fullName, socialId, provider } = req.body;
    let username = req.body.username;

    const generateUsername = async (email, socialId) => {
      const baseUsername = email ? email.split("@")[0] : `user-${socialId}`;
      let username = baseUsername;
      let count = 0;

      while (await User.findOne({ username })) {
        count++;
        username = `${baseUsername}-${count}-${socialId}`;
      }
      return username;
    };

    if (!username) {
      username = await generateUsername(email, socialId);
    }

    const data = {
      email,
      avatar,
      fullName,
      username,
      socialId,
      provider,
      lastLogin: Date.now(),
    };

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      if (existingUserByEmail.socialId !== socialId) {
        existingUserByEmail.socialId = socialId;
        existingUserByEmail.avatar = avatar || existingUserByEmail.avatar;
        existingUserByEmail.lastLogin = Date.now();
        await existingUserByEmail.save();

        const tokens = await generateAccessandRefreshToken(
          existingUserByEmail._id
        );
        const loggedInUser = await User.findById(
          existingUserByEmail._id
        ).select("-password -refreshToken");

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { user: loggedInUser, tokens },
              "User logged in successfully"
            )
          );
      } else {
        existingUserByEmail.lastLogin = Date.now();
        await existingUserByEmail.save();

        const tokens = await generateAccessandRefreshToken(
          existingUserByEmail._id
        );
        const loggedInUser = await User.findById(
          existingUserByEmail._id
        ).select("-password -refreshToken");

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { user: loggedInUser, tokens },
              "User logged in successfully"
            )
          );
      }
    }

    const existingUserBySocialId = await User.findOne({ socialId });

    if (!existingUserBySocialId) {
      const newUser = await User.create(data);
      const tokens = await generateAccessandRefreshToken(newUser._id);
      const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
      );

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { user: createdUser, tokens },
            "User registered successfully"
          )
        );
    }

    return res
      .status(401)
      .json(new ApiError(401, "User already exists with this social account"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiError(error.statusCode || 500, error.message));
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { currentPassword, newPassword, confirmPassword } = req.body;
    // console.log("Current" , currentPassword);
    // console.log("new" , newPassword);
    // console.log("confirm" , confirmPassword);

    if (newPassword !== confirmPassword) {
      throw new ApiError(400, "Passwords do not match");
    }
    if (!user.isPasswordCorrect(currentPassword)) {
      throw new ApiError(401, "Incorrect current password");
    }
    if (newPassword.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters long");
    }
    user.password = newPassword;
    const updatedUser = await user.save();
    if (!updatedUser) {
      return new ApiError(403, "Failed to update Password");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Password updated successfully"));
  } catch (error) {
    return res
      .status(error.status || 400)
      .json(
        new ApiError(
          error.status || 400,
          `Error while updating password - ${error.message}`
        )
      );
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { refreshToken: null },
      { new: true }
    );

    if (!user) {
      throw new ApiError(400, "Failed to logout, user not found");
    }

    const option = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.cookie("accessToken", "", { ...option, maxAge: 0 });
    res.cookie("refreshToken", "", { ...option, maxAge: 0 });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { message: "User logged out successfully" },
          "User logged out successfully"
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode || 400)
      .json(
        new ApiError(
          error.statusCode || 400,
          "Failed to log out \n" + error.message
        )
      );
  }
});

const updateUserTextDetails = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { email, username, fullName } = req.body;

    // Check and update email
    if (email) {
      const existingUserWithEmail = await User.findOne({ email });
      if (existingUserWithEmail) {
        return res
          .status(400)
          .json(new ApiError(400, "Email already in use, Try another"));
      }
      user.email = email;
    }

    // Check and update username
    if (username) {
      if (username.includes(" ")) {
        throw new ApiError(400, "Spaces in username are not allowed");
      }
      const existingUserWithUsername = await User.findOne({ username });
      if (existingUserWithUsername) {
        return res
          .status(400)
          .json(
            new ApiError(
              400,
              "Username is already taken, Try something different"
            )
          );
      }
      user.username = username;
    }

    if (fullName) {
      user.fullName = fullName;
    }

    const updatedUser = await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "User updated successfully"));
  } catch (error) {
    return res
      .status(error.status || 400)
      .json(
        new ApiError(
          error.status || 400,
          `Error while updating details - ${error.message}`
        )
      );
  }
});

const updateUserFiles = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { avatar, coverImage } = req.files;

    if (avatar) {
      const avatarCloudinary = await uploadOnCloudinary(avatar[0].path);
      if (!avatarCloudinary) {
        throw new ApiError(500, "Failed to update avatar");
      }
      user.avatar = avatarCloudinary.url;
    }

    if (coverImage) {
      const coverimgCloudinary = await uploadOnCloudinary(coverImage[0].path);
      if (!coverimgCloudinary) {
        throw new ApiError(500, "Failed to update Cover Image");
      }
      user.coverImage = coverimgCloudinary.url;
    }

    const updatedUser = await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Files updated successfully"));
  } catch (error) {
    return res
      .status(error.status || 400)
      .json(
        new ApiError(
          error.status || 400,
          `Error while updating files - ${error.message}`
        )
      );
  }
});
const getUserDetails = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const userDetails = await User.findById(userId).select(
      "-password -refreshToken -socialId -provider -lastLogin"
    );
    if (!userDetails) {
      return new ApiError(404, "User not found");
    }
    return res
      .status(200)

      .json(
        new ApiResponse(200, userDetails, "User details fetched successfully")
      );
  } catch (error) {
    return res
      .status(error.status || 400)
      .json(
        new ApiError(
          error.status || 400,
          `Error while fetching user details - ${error.message}`
        )
      );
  }
});

export {
  registerUser,
  loginUser,
  socialLogin,
  logoutUser,
  updatePassword,
  updateUserFiles,
  updateUserTextDetails,
  getUserDetails,
};
