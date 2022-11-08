import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: [true, "Must provide a name"],
  },
  last_name: {
    type: String,
    require: [true, "Must provide a last name"],
  },
  email: {
    type: String,
    require: [true, "Must provide an email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Must provide a password"],
  },
});

module.exports = mongoose.model("user", userSchema);
