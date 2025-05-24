import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import CustomError from "../middlewares/error-handler.middleware";
import User from "../models/user.model";
import Category from "../models/category.model";

export const create = asyncHandler(async(req:Request,res:Response)=>{
    const {name} = req.body;
    const userId = req.user._id
    console.log('controller',req.user)

  

    const user = await User.findById(userId)

    if(!user){
        throw new CustomError('user not found',404)
    }

    const category = await Category.create({name,user:user._id})

    if(!category){
        throw new CustomError('Could not create category',500)
    }

    res.status(201).json({
        message:'Category created',
        data:category,
        success:true,
        status:'success'
    })

})

export const update = asyncHandler(async(req:Request,res:Response)=>{
    const {name} = req.body;
    const {id} = req.params
    const userId = req.user._id


    if(!id){
        throw new CustomError('category id  is required',400)
    }

    if(!userId){
        throw new CustomError('user is required',400)
    }

    const user = await User.findById(userId)

    if(!user){
        throw new CustomError('user not found',404)
    }

    const category = await Category.findOneAndUpdate({_id:id,user:userId},{name},{new:true})


    if(!category){
        throw new CustomError('category not found',404)
    }

    res.status(201).json({
        message:'Category updated',
        data:category,
        success:true,
        status:'success'
    })


})

export const getById = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params

    console.log('get one',req.user)

    if(!id){
        throw new CustomError('category id  is required',400)
    }

    const category = await Category.findById(id)

    if(!category){
        throw new CustomError('category not found',404)
    }

    res.status(201).json({
        message:'Category fetched',
        data:category,
        success:true,
        status:'success'
    })


})

export const getAll = asyncHandler(async(req:Request,res:Response)=>{


 
    const category = await Category.find({})

   

    res.status(201).json({
        message:'Categories fetched',
        data:category,
        success:true,
        status:'success'
    })


})





export const getAllUserCategory = asyncHandler(async(req:Request,res:Response)=>{
   
    const userId = req.user._id

    console.log('here')

    const categories = await Category.find({user:userId.toString()})

 
    res.status(201).json({
        message:'Category fetched',
        data:categories,
        success:true,
        status:'success'
    })


})


export const remove = asyncHandler(async(req:Request,res:Response)=>{
   
    const userId = req.user._id
    const {id} = req.params

    await Category.deleteOne({user:userId,_id:id})

 
    res.status(201).json({
        message:'Category deleted',
        data:null,
        success:true,
        status:'success'
    })


})