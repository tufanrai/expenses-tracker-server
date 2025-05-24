"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (uri) => {
    mongoose_1.default
        .connect(uri)
        .then(() => console.log("Database connected"))
        .catch((err) => {
        console.log("database connection error", err);
    });
};
exports.connectDB = connectDB;
