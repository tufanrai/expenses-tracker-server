import { Request, Response } from "express";
import errorHelper from "../helper/errorhandler";
import Client from "../models/User.model";
import Category from "../models/category.model";
import asyncHandler from "../helper/asyncHandler";

// Create new category
export const create = async(req: Request, res: Response) => {
    const {name, userId} = req.body
    if(!userId) {
        throw new errorHelper('user id is required', 400)
    }
    const user = await Client.findById(userId)
    if(!user) {
        throw new errorHelper('user not found', 404)
    }
    const category = await Category.create({name,user: user._id})
    res.send(201).json({
        message: 'Cerated successfuly',
        data: category,
        success: true,
        staus: 'success'
    })
}

// Update the existing category
export const update = async(req: Request, res: Response) => {
    const {name, userId} = req.body
    const {id} = req.params
    if(!id) {
        throw new errorHelper('category id is required', 400)
    }
    if(!userId) {
        throw new errorHelper('user is required', 400)
    }
    const user = await Client.findById(userId)

    if(!user) {
        throw new errorHelper('user not found', 404)
    }
    const category = await Category.findOneAndUpdate({_id: id, user: userId},{name}, {new: true})
    if(!category) {
        throw new errorHelper('category not found', 404)
    }
    res.send(201).json({
        message: 'Cerated successfuly',
        data: category,
        success: true,
        staus: 'success'
    })
}

// Gets the category by id
export const getById = async(req: Request, res: Response) => {
    const {id} = req.params
    if(!id) {
        throw new errorHelper('category id is required', 400)
    }
    const user = await Client.findById(id)
    const category = await Category.findById(id)
    if(!category) {
        throw new errorHelper('category not found', 404)
    }
    res.send(201).json({
        message: 'Cerated successfuly',
        data: category,
        success: true,
        staus: 'success'
    })
}

// get all user category
export const getAll = asyncHandler(async(req: Request, res: Response) => {
    const userId = req.user._id
    const category = await Category.find({user: userId})
    res.send(201).json({
        message: 'Cerated successfuly',
        data: category,
        success: true,
        staus: 'success'
    })
})

// delets the category 
export const remove = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    const userId = req.user._id
    await Category.deleteOne({user: userId, _id: id})
    res.status(200).json({
        status: 200,
        message: 'category deleted',
    })
})