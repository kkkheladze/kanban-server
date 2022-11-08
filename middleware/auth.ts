import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
const User = require("../models/User");

const appendUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token)
    return res.status(403).send("A token is required for authentication");

  const verified = jwt.verify(token, process.env.JWT_SECRET!);

  if (!verified) {
    return res.status(401).send("Invalid Token");
  }
  req.user = await User.findOne({ email });
  next();
};
