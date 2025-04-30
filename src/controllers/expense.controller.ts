import { Response ,Request} from 'express'
import Expense from '../models/expense.model'
import { asyncHandler } from '../utils/async-handler'
import CustomError from '../middlewares/error-handler.middleware'
import Category from '../models/category.model'
import {deleteImages} from '../config/cloudinary.config'

export const create = asyncHandler(async(req:Request,res:Response) =>{

    const {categoryId,...data} = req.body
    const userId = req.user._id

    const files = req.files as Express.Multer.File[]

  

    console.log("👊 ~ expense.controller.ts:44 ~ create ~ files:", files)


    if(!categoryId){
        throw new CustomError('categoryId is required',400)
    }
    const expense = new Expense(data)

    const category = await Category.findById(categoryId)

    if(!category){
        throw new CustomError('category not found',404)
    }

    expense.category = category._id;
    expense.user = userId;

    if(files && files.length > 0){
         files.forEach(receipt => {
             expense.receipts.push({
                path:receipt.path,
                public_id:receipt.filename
            })
        })

    }

    await expense.save()



    res.status(201).json({
        status:'success',
        message:"Expense added",
        data:expense,
        success:true
    })
    
})

export const update = asyncHandler(async(req:Request,res:Response) =>{

    const {categoryId,title,date,amount,description,removedImages} = req.body
    const userId = req.user._id
    const {id} = req.params
    const files = req.files as Express.Multer.File[]

  

    console.log("👊 ~ expense.controller.ts:44 ~ create ~ files:", files)

    const expense = await Expense.findOne({_id:id,user:userId})


    if(!expense){
        throw new CustomError('expense not found',404)
    }


    if(title) expense.title = title
    if(amount) expense.amount = amount
    if(description) expense.description = description
    if(date) expense.date = date
     

    if(categoryId){
        const category = await Category.findById(categoryId)

        if(!category){
            throw new CustomError('category not found',404)
        }
    
        expense.category = category._id;
    }


    if(files && files.length > 0){
         files.forEach(receipt => {
             expense.receipts.push({
                path:receipt.path,
                public_id:receipt.filename
            })
        })

    }

    if(removedImages){
        const deletedImages:string[] = JSON.parse(removedImages)

        await deleteImages(deletedImages)

        deletedImages.forEach(public_id =>{
                expense.receipts.pull({public_id})
        })
    }

   const updatedExpense = await expense.save()



    res.status(200).json({
        status:'success',
        message:"Expense updated",
        data:updatedExpense,
        success:true
    })
    
})

    






export const getAllByUser = asyncHandler(async(req:Request,res:Response) =>{

    const userId = req.user._id

   const expenses =  await Expense.find({user:userId})

    res.status(201).json({
        status:'success',
        message:"Expense fetched",
        data:expenses,
        success:true
    })
    
})

export const getAllUserExpByCategory = asyncHandler(async(req:Request,res:Response) =>{

    const userId = req.user._id
    const {categoryId} = req.params
    
    if(!categoryId){
        
        throw new CustomError('categoryId is required',400)
    }
   const expenses =  await Expense.find({user:userId,category:categoryId})

    res.status(201).json({
        status:'success',
        message:"Expense fetched",
        data:expenses,
        success:true
    })
    
})