import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/UserModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
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

export const registerUser = async (req, res) => {
  try {
    console.log("Registration request received:", req.body);
    
    // Check if all required fields are present
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      console.log("Missing required fields:", { firstName, lastName, email, password: password ? "provided" : "missing" });
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    
    console.log("Checking if user already exists...");
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }
    
    console.log("Processing file uploads...");
    // Handle file uploads
    let avatarLocalPath;
    let coverImageLocalPath;
    
    if (req.files && Object.keys(req.files).length > 0) {
      console.log("Files received:", Object.keys(req.files));
      
      if (req.files.avatar && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;
        console.log("Avatar path:", avatarLocalPath);
      }
      
      if (req.files.coverImage && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
        console.log("Cover image path:", coverImageLocalPath);
      }
    }
    
    // Upload to cloudinary if there are files
    let avatarUrl = "";
    let coverImageUrl = "";
    
    if (avatarLocalPath) {
      console.log("Uploading avatar to cloudinary...");
      try {
        const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
        if (avatarUpload) {
          avatarUrl = avatarUpload.url;
          console.log("Avatar uploaded successfully:", avatarUrl);
        } else {
          console.log("Avatar upload failed");
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary avatar upload error:", cloudinaryError);
      }
    }
    
    if (coverImageLocalPath) {
      console.log("Uploading cover image to cloudinary...");
      try {
        const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath);
        if (coverImageUpload) {
          coverImageUrl = coverImageUpload.url;
          console.log("Cover image uploaded successfully:", coverImageUrl);
        } else {
          console.log("Cover image upload failed");
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary cover image upload error:", cloudinaryError);
      }
    }
    
    // Create user object
    console.log("Creating user in database...");
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone: req.body.phone || "",
      role: req.body.role || "user",
      avatar: avatarUrl,
      coverImage: coverImageUrl || ""
    });
    
    console.log("User created with ID:", user._id);
    
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Update user with refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    
    // Set up cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    };
    
    // Send response with cookies
    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .json({
        success: true,
        message: "User registered successfully",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar
        },
        accessToken
      });
      
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during registration"
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Update user with refresh token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
  console.log(user);
    // Set up cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    };

    // Send response with cookies
    console.log(`User ${user._id} logged in successfully`);
    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar
        },
        accessToken
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error during login"
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    
    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required"
      });
    }
    
    try {
      // Verify the refresh token
      const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
      
      // Find the user
      const user = await User.findById(decodedToken._id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token"
        });
      }
      
      // Check if the incoming refresh token matches the one saved in the DB
      if (user.refreshToken !== incomingRefreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token is expired or used"
        });
      }
      
      // Generate new tokens
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      
      // Update user with new refresh token
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      };
      
      // Send response with new tokens
      return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .json({
          success: true,
          message: "Access token refreshed",
          accessToken
        });
        
    } catch (error) {
      // Token verification failed
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }
    
  } catch (error) {
    console.error("Token refresh error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during token refresh"
    });
  }
};

export const socialLogin = asyncHandler(async (req, res) => {
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

export const updatePassword = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
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

export const logoutUser = asyncHandler(async (req, res) => {
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

export const updateUserTextDetails = asyncHandler(async (req, res) => {
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

export const updateUserFiles = asyncHandler(async (req, res) => {
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

export const getUserDetails = asyncHandler(async (req, res) => {
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

