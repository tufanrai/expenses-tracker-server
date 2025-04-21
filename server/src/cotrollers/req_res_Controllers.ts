import { NextFunction, request, response } from "express";
import Client from "../models/User.model"
import { NestedPaths } from "mongoose";

export const user = async (req: Request, res: Response) => {
    const user = await Client.find()
    console.log(user)
    res.status(200).json(user)
}

export const userId = async (req: Request, res: Response) => {
    const user = await Client.findById(request.params.id)
    if(!user){
        console.log("user doesn't exists")
        return
    }
    console.log(user)
    res.status(404).json(user)
}