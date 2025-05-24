"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, 'user is required'],
        ref: 'user'
    }
}, { timestamps: true });
const Category = mongoose_1.default.model('category', categorySchema);
exports.default = Category;
