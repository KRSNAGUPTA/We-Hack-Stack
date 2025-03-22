import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, 
      required: false,
      unique: true,
      minlength: 3,
    },
    fullName: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 100,
    },
    socialId: {
      type: String,
    },
    provider: {
      type: String
    },
    lastLogin:{
      type: Date,
    },
    email: {
      type: String,
      required:true,
      sparse: true, //allow null values
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      minlength: 8,
    },
    refreshToken: {
      type: String,
    },
    avatar: {
      type: String, // Cloudinary link
    },
    coverImage: {
      type: String, // Cloudinary link
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving, if present
userSchema.pre("save", async function (next) {
  // Only hash the password if it's been modified (or is new)
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.password) return false; // No password to compare
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("validate", function (next) {
  if (!this.password && !this.socialId) {
    return next(new Error("Either password or socialId must be provided."));
  }
  if (this.socialId && !this.provider) {
    return next(new Error("Social login must have a provider."));
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
