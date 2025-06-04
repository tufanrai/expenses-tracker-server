import { Response,Request } from "express";
import { asyncHandler } from "../utils/async-handler";
import User from "../models/user.model";
import { compare, hash } from "../utils/bcrypt.util";
import CustomError from "../middlewares/error-handler.middleware";
import { generateJwTToken } from "../utils/jwt.utils";


export const register  = asyncHandler(async(req:Request,res:Response)=>{

    const {password,role,...data} = req.body;

    if(!password){
        throw new CustomError('Password is required',400)
    }

    const hashedPassword = await hash(password)
   
    const user = await User.create({...data,password:hashedPassword})

    res.status(201).json({
        message:'User register success',
        data:user,
        success:true,
        status:"success"
    })

})


export const login  = asyncHandler(async(req:Request,res:Response)=>{

    const {password,email} = req.body;

    if(!password){
        throw new CustomError('Password is required',400)
    }

    if(!email){
        throw new CustomError('Email is required',400)
    }


    const user = await User.findOne({email})

    if(!user){
        throw new CustomError('Invalid email or password',400)
    }


    const isPasswordMatched = await compare(password,user.password)

    if(!isPasswordMatched){
        throw new CustomError('Invalid email or password',400)
    }


const token = generateJwTToken({
                                _id:user._id,
                                email:user.email,
                                user_name:user.user_name,
                                full_name:user.full_name,
                                role:user.role
                            })

    res.status(201).json({
        message:'User login success',
        data:user,
        success:true,
        access_token:token,
        status:"success"
    })

})