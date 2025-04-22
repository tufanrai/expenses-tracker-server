import { NextFunction, Request, Response } from "express";
import Client from "../models/User.model"
import { NestedPaths } from "mongoose";
import asyncHandler from "../helper/asyncHanlder";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const user = await Client.create(req.body)
    res.send(201).json({
        status: 201,
        message: "data created successfuly",
        user
    })
})