import { Response ,Request} from 'express'
import Expense from '../models/expense.model'
import { asyncHandler } from '../utils/async-handler'
import CustomError from '../middlewares/error-handler.middleware'
import Category from '../models/category.model'
import {deleteImages} from '../config/cloudinary.config'
import { sendMail } from '../utils/send-mail.util'
import { getPagination } from '../utils/pagination.util'

export const create = asyncHandler(async(req:Request,res:Response) =>{

    const {categoryId,...data} = req.body
    const userId = req.user._id

    const files = req.files as Express.Multer.File[]


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

    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">New Expense Added by ${req.user.full_name}</h1>
      <h2 style="color: #555; font-size: 20px; margin-bottom: 15px;">Expense Detail</h2>
      <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Title:</strong> <span style="color: #000;">${expense.title}</span></p>
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Amount:</strong> <span style="color: #2d87f0;">Rs.${expense.amount}</span></p>
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Expense Date:</strong> <span style="color: #000;">${expense.date}</span></p>
        <h3 style="font-weight: 900; color: #007BFF; font-size: 20px; margin-top: 20px;">Description:</h3>
        <p style="font-size: 16px; color: #555; margin-top: 5px;">${expense.description ?? 'No Description Found'}</p>
      </div>
    </div>
  `;
  


    await sendMail({
        to:'rsaagar7200@gmail.com',
        subject:'Expense Created',
        html
    })

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

    if(removedImages && expense.receipts.length > 0){
        const deletedImages:string[] = JSON.parse(removedImages)

        await deleteImages(deletedImages)


        expense.receipts = expense.receipts.filter(receipt =>  !deletedImages.includes(receipt?.public_id?.toString()) ) as any
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
    const {per_page="10",page="1",title,max_amount , min_amount} = req.query

    const limit = parseInt(per_page as string)
    const current_page = parseInt(page as string)
    const skip =  (current_page -1) * limit

    let filter:any = {}

    if(title){
        // filter.title = {$regex:title,$options:'i'}
        // filter.description = {regex:title,$options:'i'}
        filter.$or = [
           { title:new RegExp(title as string, 'i')},
            {description:new RegExp(title as string, 'i')}
        ]
    }

    if(max_amount && min_amount){
        filter.amount= { 
            $lte:Number(max_amount),
            $gte:Number(min_amount)
        }
    }
   const expenses =  await Expense.find({user:userId,...filter}).limit(limit).skip(skip).sort({createdAt:-1})
   const total = await Expense.countDocuments({user:userId,...filter})
   const pagination = getPagination(total,limit,current_page)

    res.status(201).json({
        status:'success',
        message:"Expense fetched",
        data:{data:expenses,pagination},
        success:true
    })
    
})

export const getAllUserExpByCategory = asyncHandler(async(req:Request,res:Response) =>{

    const userId = req.user._id
    const {categoryId} = req.params
    const {per_page="10",page="1",title} = req.query

    const limit = parseInt(per_page as string)
    const current_page = parseInt(page as string)
    const skip =  (current_page -1) * limit

    let filter:any = {}

    if(title){
        filter.title = {$regex:title,$options:'i'}
        // filter.description = {$regex:title,$options:'i'}
    }
 

    
    if(!categoryId){
        
        throw new CustomError('categoryId is required',400)
    }

   const expenses =  await Expense.find({user:userId,category:categoryId,...filter}).limit(limit).skip(skip).sort({createdAt:-1})

   const total = await Expense.countDocuments({user:userId,category:categoryId,...filter})
   const pagination = getPagination(total,limit,current_page)


    res.status(201).json({
        status:'success',
        message:"Expense fetched",
        data:{
            data:expenses,
            pagination
        },
        success:true
    })
    
})


export const remove = asyncHandler(async(req:Request,res:Response)=>{
    const {id} = req.params
    const userId = req.user._id

    const expense = await Expense.findById(id)
    if(!expense){
        throw new CustomError('Expense not found',404)
    }

    if(expense.user !== userId){
        throw new CustomError('You can not perform this operation',400)
    }


    await expense.deleteOne()

    if(expense.receipts && expense.receipts.length > 0){
        const public_ids = expense.receipts.map(receipt => receipt.public_id) as string[]
       await  deleteImages(public_ids)
    }


    res.status(200).json({
        status:'success',
        success:true,
        message:'Expense deleted.',
        data:null
    })

})