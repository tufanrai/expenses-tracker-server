"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_types_1 = require("../types/enum.types");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose_1.Schema({
    full_name: {
        type: String,
        required: [true, 'Name is required']
    },
    user_name: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, 'Email address is already used'],
        // match:[emailRegex,'Email is not valid'],
        validate: {
            validator: function (v) {
                return emailRegex.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        },
    },
    role: {
        type: String,
        enum: Object.values(enum_types_1.Role),
        default: enum_types_1.Role.USER
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: String,
        match: [/^(98|97)\d{8}$/, 'Please enter a valid Nepali phone number']
    }
}, { timestamps: true });
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
