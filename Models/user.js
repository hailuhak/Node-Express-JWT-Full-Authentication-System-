import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
      required: true,
      unique: true,
      lowercass: true
        },
    password: {
        type: String,
       required: true,
       minlength: 6
    }
});

export const User = mongoose.model("user", userSchema);
