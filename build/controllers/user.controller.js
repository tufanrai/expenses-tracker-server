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
exports.updateProfile = exports.getProfile = void 0;
const async_handler_1 = require("../utils/async-handler");
const user_model_1 = __importDefault(require("../models/user.model"));
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
exports.getProfile = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.default('User not found', 404);
    }
    res.status(200).json({
        message: 'profile fetched success',
        status: 'success',
        success: true,
        data: user
    });
}));
exports.updateProfile = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const data = req.body;
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new error_handler_middleware_1.default('User not found', 404);
    }
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, data, { new: true });
    res.status(200).json({
        message: 'profile update success',
        status: 'success',
        success: true,
        data: updatedUser
    });
}));
