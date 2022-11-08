import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const User = require("../models/User");

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("All inputs are required");
  }
  const user = await User.findOne({ email });
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (user && passwordsMatch) {
    user.token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }
    );
    res
      .cookie("access_token", user.token, { httpOnly: true })
      .status(200)
      .json(user);
  } else {
    res.status(400).send("Invalid credentials");
  }
};

const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  if (!(first_name && last_name && email && password)) {
    return res.status(400).send("All inputs are required");
  }

  const oldUser = await User.findOne({
    email,
  });
  if (oldUser) {
    return res.status(409).send("User already exists. Please login");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  user.token = jwt.sign({ user_id: user._id, email }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
  res
    .cookie("access_token", user.token, { httpOnly: true })
    .status(200)
    .json(user);
};

module.exports = { login, register };
