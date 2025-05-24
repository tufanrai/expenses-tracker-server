import { Request,Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import User from "../models/user.model";
import CustomError from "../middlewares/error-handler.middleware";

export const getProfile = asyncHandler(async(req:Request,res:Response) =>{
    const {userId} = req.params
    const user = await User.findById(userId)
    if(!user){
        throw new CustomError('User not found',404)
    }
    res.status(200).json({
        message:'profile fetched success',
        status:'success',
        success:true,
        data:user
    })

})

export const updateProfile = asyncHandler(async(req:Request,res:Response) =>{
    const {userId} = req.params
    const data = req.body
    const user = await User.findById(userId)
    if(!user){
        throw new CustomError('User not found',404)
    }

    const updatedUser = await User.findByIdAndUpdate(userId,data,{new:true})
    res.status(200).json({
        message:'profile update success',
        status:'success',
        success:true,
        data:updatedUser
    })

})