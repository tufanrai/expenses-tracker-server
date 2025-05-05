"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getAllUserExpByCategory = exports.getAllByUser = exports.update = exports.create = void 0;
const expense_model_1 = __importDefault(require("../models/expense.model"));
const async_handler_1 = require("../utils/async-handler");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const category_model_1 = __importDefault(require("../models/category.model"));
const cloudinary_config_1 = require("../config/cloudinary.config");
const send_mail_util_1 = require("../utils/send-mail.util");
const pagination_util_1 = require("../utils/pagination.util");
exports.create = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body, { categoryId } = _b, data = __rest(_b, ["categoryId"]);
    const userId = req.user._id;
    const files = req.files;
    console.log("👊 ~ expense.controller.ts:44 ~ create ~ files:", files);
    if (!categoryId) {
        throw new error_handler_middleware_1.default('categoryId is required', 400);
    }
    const expense = new expense_model_1.default(data);
    const category = yield category_model_1.default.findById(categoryId);
    if (!category) {
        throw new error_handler_middleware_1.default('category not found', 404);
    }
    expense.category = category._id;
    expense.user = userId;
    if (files && files.length > 0) {
        files.forEach(receipt => {
            expense.receipts.push({
                path: receipt.path,
                public_id: receipt.filename
            });
        });
    }
    yield expense.save();
    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">New Expense Added by ${req.user.full_name}</h1>
      <h2 style="color: #555; font-size: 20px; margin-bottom: 15px;">Expense Detail</h2>
      <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0;">
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Title:</strong> <span style="color: #000;">${expense.title}</span></p>
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Amount:</strong> <span style="color: #2d87f0;">Rs.${expense.amount}</span></p>
        <p style="font-size: 16px; color: #555; margin: 10px 0;"><strong>Expense Date:</strong> <span style="color: #000;">${expense.date}</span></p>
        <h3 style="font-weight: 900; color: #007BFF; font-size: 20px; margin-top: 20px;">Description:</h3>
        <p style="font-size: 16px; color: #555; margin-top: 5px;">${(_a = expense.description) !== null && _a !== void 0 ? _a : 'No Description Found'}</p>
      </div>
    </div>
  `;
    yield (0, send_mail_util_1.sendMail)({
        to: 'rsaagar7200@gmail.com',
        subject: 'Expense Created',
        html
    });
    res.status(201).json({
        status: 'success',
        message: "Expense added",
        data: expense,
        success: true
    });
}));
exports.update = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, title, date, amount, description, removedImages } = req.body;
    const userId = req.user._id;
    const { id } = req.params;
    const files = req.files;
    const expense = yield expense_model_1.default.findOne({ _id: id, user: userId });
    if (!expense) {
        throw new error_handler_middleware_1.default('expense not found', 404);
    }
    if (title)
        expense.title = title;
    if (amount)
        expense.amount = amount;
    if (description)
        expense.description = description;
    if (date)
        expense.date = date;
    if (categoryId) {
        const category = yield category_model_1.default.findById(categoryId);
        if (!category) {
            throw new error_handler_middleware_1.default('category not found', 404);
        }
        expense.category = category._id;
    }
    if (files && files.length > 0) {
        files.forEach(receipt => {
            expense.receipts.push({
                path: receipt.path,
                public_id: receipt.filename
            });
        });
    }
    if (removedImages && expense.receipts.length > 0) {
        const deletedImages = JSON.parse(removedImages);
        yield (0, cloudinary_config_1.deleteImages)(deletedImages);
        expense.receipts = expense.receipts.filter(receipt => { var _a; return !deletedImages.includes((_a = receipt === null || receipt === void 0 ? void 0 : receipt.public_id) === null || _a === void 0 ? void 0 : _a.toString()); });
    }
    const updatedExpense = yield expense.save();
    res.status(200).json({
        status: 'success',
        message: "Expense updated",
        data: updatedExpense,
        success: true
    });
}));
exports.getAllByUser = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const expenses = yield expense_model_1.default.find({ user: userId });
    res.status(201).json({
        status: 'success',
        message: "Expense fetched",
        data: expenses,
        success: true
    });
}));
exports.getAllUserExpByCategory = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { categoryId } = req.params;
    const { per_page = "10", page = "1", title } = req.query;
    const limit = parseInt(per_page);
    const current_page = parseInt(page);
    const skip = (current_page - 1) * limit;
    let filter = {};
    if (title) {
        filter.title = { $regex: title, $options: 'i' };
        filter.description = { $regex: title, $options: 'i' };
    }
    // if(A){
    //     filter.amount = 
    // }
    if (!categoryId) {
        throw new error_handler_middleware_1.default('categoryId is required', 400);
    }
    const expenses = yield expense_model_1.default.find(Object.assign({ user: userId, category: categoryId }, filter)).limit(limit).skip(skip).sort({ createdAt: -1 });
    const total = yield expense_model_1.default.countDocuments({ user: userId, category: categoryId });
    const pagination = (0, pagination_util_1.getPagination)(total, limit, current_page);
    res.status(201).json({
        status: 'success',
        message: "Expense fetched",
        data: {
            data: expenses,
            pagination
        },
        success: true
    });
}));
exports.remove = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user._id;
    const expense = yield expense_model_1.default.findById(id);
    if (!expense) {
        throw new error_handler_middleware_1.default('Expense not found', 404);
    }
    if (expense.user !== userId) {
        throw new error_handler_middleware_1.default('You can not perform this operation', 400);
    }
    yield expense.deleteOne();
    if (expense.receipts && expense.receipts.length > 0) {
        const public_ids = expense.receipts.map(receipt => receipt.public_id);
        yield (0, cloudinary_config_1.deleteImages)(public_ids);
    }
    res.status(200).json({
        status: 'success',
        success: true,
        message: 'Expense deleted.',
        data: null
    });
}));
