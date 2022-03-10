import mongoose from "mongoose";

// UserSchema 會對應到你 MongoDB 內的某個 collection
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
