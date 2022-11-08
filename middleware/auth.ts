import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const appendUser = async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["Authorization"];

  if (!token)
    return res.status(403).send("A token is required for authentication");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    return res.status(401).send("Invalid Token");
  }
  req.user = decoded;
  next();
};

module.exports = appendUser;
