import { NextFunction, Request, Response } from "express";
import Client from "../models/User.model"
import { NestedPaths } from "mongoose";
import asyncHandler from "../helper/asyncHanlder";

export const user = asyncHandler(async (req: Request, res: Response) => {
    const user = await Client.find()
    console.log(user)
    res.status(200).json(user)
})

export const userId = asyncHandler(async (req: Request, res: Response) => {
    const user = await Client.findById(req.params.id)
    if(!user){
        console.log("user doesn't exists")
        return
    }
    console.log(user)
    res.status(404).json(user)
})