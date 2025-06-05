import { NextFunction, Request, Response } from "express";
import { Role } from "../types/enum.types";
import CustomError from "./error-handler.middleware";
import { verifyJWT } from "../utils/jwt.utils";
import User from "../models/user.model";

export const Authenticate = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth_header = req.headers["authorization"];

      if (!auth_header) {
        throw new CustomError("Unauthorized, access denied", 401);
      }

      if (
        auth_header.split(" ").length !== 2 &&
        !auth_header.startsWith("BEARER")
      ) {
        throw new CustomError("Unauthorized, access denied", 401);
      }

      const token = auth_header.split(" ")[1];

      if (!token) {
        throw new CustomError("Unauthorized, access denied", 401);
      }

      const decoded = verifyJWT(token);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        throw new CustomError("Unauthorized, token expired", 401);
      }

      const user = await User.findById(decoded._id);

      if (!user) {
        throw new CustomError("User not found ", 401);
      }

      if (roles && !roles.includes(user.role)) {
        throw new CustomError("Users role did not matched", 403);
      }

      req.user = {
        _id: decoded._id,
        email: decoded.email,
        user_name: decoded.user_name,
        full_name: decoded.full_name,
        role: decoded.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
