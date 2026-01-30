import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },role:{
      type:String,
      enum:['user','admin'],
      default:'user'
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre(
  "save",
  async function (next) {
    if (!this.isModified("password")) {
      return ;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
  },
);

userSchema.methods.matchPassword = 
  async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
const User = mongoose.model("User", userSchema);
export default User;
