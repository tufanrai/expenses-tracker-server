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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.getAllUserCategory = exports.getAll = exports.getById = exports.update = exports.create = void 0;
const async_handler_1 = require("../utils/async-handler");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const user_model_1 = __importDefault(require("../models/user.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
exports.create = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const userId = req.user._id;
    console.log("controller", req.user);
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.default("user not found", 404);
    }
    const category = yield category_model_1.default.create({ name, user: user._id });
    if (!category) {
        throw new error_handler_middleware_1.default("Could not create category", 500);
    }
    res.status(201).json({
        message: "Category created",
        data: category,
        success: true,
        status: "success",
    });
}));
exports.update = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { id } = req.params;
    const userId = req.user._id;
    if (!id) {
        throw new error_handler_middleware_1.default("category id  is required", 400);
    }
    if (!userId) {
        throw new error_handler_middleware_1.default("user is required", 400);
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.default("user not found", 404);
    }
    const category = yield category_model_1.default.findOneAndUpdate({ _id: id, user: userId }, { name }, { new: true });
    if (!category) {
        throw new error_handler_middleware_1.default("category not found", 404);
    }
    res.status(201).json({
        message: "Category updated",
        data: category,
        success: true,
        status: "success",
    });
}));
exports.getById = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("get one", req.user);
    if (!id) {
        throw new error_handler_middleware_1.default("category id  is required", 400);
    }
    const category = yield category_model_1.default.findById(id);
    if (!category) {
        throw new error_handler_middleware_1.default("category not found", 404);
    }
    res.status(201).json({
        message: "Category fetched",
        data: category,
        success: true,
        status: "success",
    });
}));
exports.getAll = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.find({});
    res.status(201).json({
        message: "Categories fetched",
        data: category,
        success: true,
        status: "success",
    });
}));
exports.getAllUserCategory = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    if (!userId) {
        console.log("userId not found");
    }
    console.log("here");
    const categories = yield category_model_1.default.find({ user: userId });
    res.status(201).json({
        message: "Category fetched",
        data: categories,
        success: true,
        status: "success",
    });
}));
exports.remove = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { id } = req.params;
    yield category_model_1.default.deleteOne({ user: userId, _id: id });
    res.status(201).json({
        message: "Category deleted",
        data: null,
        success: true,
        status: "success",
    });
}));
