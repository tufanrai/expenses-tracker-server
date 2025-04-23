import { NextFunction, Request, Response } from "express";
import Client from "../models/User.model"
import { NestedPaths } from "mongoose";
import asyncHandler from "../helper/asyncHanlder";
import { hash } from '../helper/bcryptHandler'
import errorHelper, { errorHandler } from "../helper/errorhandler";
import { generateJwtToken } from "../helper/hwt.helper";

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
    const User = await Client.findOne({email : `${req.body.email}`, password: `${req.body.password}`})
    const token = generateJwtToken({_id: Client._id, email: Client.email, full_name: Client.full_name})
    console.log(User)
    res.status(200).json({
        User,
        access_token: token
    })
})

