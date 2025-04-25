import { NextFunction, Request, Response } from "express";
import Client from "../models/User.model"
import { NestedPaths } from "mongoose";
import asyncHandler from "../helper/asyncHandler";
import { hash } from '../helper/bcryptHandler'
import errorHelper, { errorHandler } from "../helper/errorhandler";
import { generateJwtToken } from "../helper/jwt.helper";
import { Role } from "../types/enum.types";

// Sign-in new accounts 
export const register = asyncHandler(async (req: Request, res: Response) => {
    const password = req.body.password
    if (!password) {
        throw new errorHelper('password is required', 400)
    }
    const hashedPassword = await hash(password)
    const user = await Client.create(req.body)
    res.send(201).json({
        status: 201,
        message: "data created successfuly",
        user
    })
})

// check authenticity and login
export const log_in = asyncHandler(async (req: Request, res: Response, next:NextFunction) => {
    const User = await Client.findOne({email : req.body.email})
    if(!User) {
        throw new errorHelper('user not found', 404)
    }
    const token = generateJwtToken({_id: User._id,
                                     user_name:User.user_name,
                                     email: User.email,
                                     full_name: User.full_name,
                                     role: User.role
                                    })
    console.log(User)
    res.status(200).json({
        User,
        access_token: token
    })
})

