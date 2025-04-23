import { NextFunction, Request, Response } from "express";
import Client from "../models/User.model"
import { NestedPaths } from "mongoose";
import asyncHandler from "../helper/asyncHanlder";
import errorHelper from "../helper/errorhandler";

// Sends all the files from the collection "Clients"
export const user = asyncHandler(async (req: Request, res: Response) => {
    const user = await Client.find()
    console.log(user)
    res.status(200).json(user)
})

// Sends the files from the collection "Clients" with requested id
export const userId = asyncHandler(async (req: Request, res: Response) => {
    const user = await Client.findById(req.params.id)
    if(!user){
        console.log("user doesn't exists")
        return
    }
    console.log(user)
    res.status(404).json(user)
})

// access the users profile 
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.id
    const user = await Client.findById(userId)
    if(!user) {
        throw new errorHelper('user not found', 400)
    }
    res.status(200).json({
        message: 'profiile',
        status: 'success',
        data: user
    })
})

// updated the users profile as per demand and saves it 
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params
    const data = req.body
    const user = await Client.findById(userId)
    if(!user) {
        throw new errorHelper('user not found', 400)
    }
    const updatedProfile = await Client.findByIdAndUpdate(userId, data, {new: true})
    res.status(200).json({
        message: 'profiile',
        status: 'success',
        data: user
    })
})