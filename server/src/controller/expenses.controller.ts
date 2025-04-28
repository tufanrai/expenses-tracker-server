import { Request, Response } from "express";
import asyncHandler from "../helper/asyncHandler";
import Expenses from "../models/expenses.model";
import errorHelper from "../helper/errorhandler";
import Category from "../models/category.model";
import stripFilename from '../../node_modules/@jridgewell/trace-mapping/dist/types/strip-filename.d';

// creats new expenses
export const createExpesnse = asyncHandler(async (req: Request, res: Response) => {
    const {categoryId ,...data}= req.body
    const userId = req.user._id
    if(!categoryId){
        throw new errorHelper('categoryId es required', 400)
    }
    const expense = new Expenses(data) // created an expenses instance 
    const category = await Category.findById(categoryId) // searched for categoy in the db
    if(!category) {
        throw new errorHelper('category not found', 404)
    }
    expense.category = category._id // assigned the user id to category
    expense.user = userId // assigned user id to user
    await expense.save() // created expenses data
    res.status(201).json({
        message: 'expense created successfylly',
        status: 'success',
        data: expense,
        success: true
    })
})

// return all the expensis of the user
export const getAllByUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user._id
    const expenses = await Expenses.find({user: userId})
    res.status(201).json({
        message: 'expenses featched',
        status: 'success',
        data: expenses,
        success: true
    })
})

// returns all the user expenses by category
export const getAllByUserExpByCategory = asyncHandler(async (req: Request, res: Response) => {
    const {categoryId} = req.params
    const userId = req.user._id
    if(!categoryId){
        throw new errorHelper('categoryId es required', 400)
    }
    const expenses = await Expenses.find({user: userId}) // searched for categoy in the db
    if(!expenses) {
        throw new errorHelper('category not found', 404)
    }
    res.status(201).json({
        status: 'success',
        data: expenses,
        success: true
    })
})

// update expenses
export const updateExpenses = asyncHandler(async (req: Request, res: Response) => {
    const {categoryId ,...data}= req.body
    const expenseId = req.params.id
    const userId = req.user._id
    const category = await Category.findById(categoryId)
    if(!category) { // checks for the category with the id 
        throw new errorHelper('category not found', 404)
    }
    const targetExpense = await Expenses.findById(expenseId)
    if(!targetExpense) { // checks for expenses with the id 
        throw new errorHelper('expenses not found', 404)
    }
    const expenses = await Expenses.updateOne({user: userId, _id: expenseId}, {...data, category: categoryId} ) // updates the expenses
    res.status(201).json({
        message: 'expense updated',
        status: 'success',
        data: expenses,
        success: true
    })
})