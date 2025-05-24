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
exports.login = exports.register = void 0;
const async_handler_1 = require("../utils/async-handler");
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_util_1 = require("../utils/bcrypt.util");
const error_handler_middleware_1 = __importDefault(require("../middlewares/error-handler.middleware"));
const jwt_utils_1 = require("../utils/jwt.utils");
exports.register = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password, role } = _a, data = __rest(_a, ["password", "role"]);
    if (!password) {
        throw new error_handler_middleware_1.default("Password is required", 400);
    }
    const hashedPassword = yield (0, bcrypt_util_1.hash)(password);
    const user = yield user_model_1.default.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
    res.status(201).json({
        message: "User register success",
        data: user,
        success: true,
        status: "success",
    });
}));
exports.login = (0, async_handler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    if (!password) {
        throw new error_handler_middleware_1.default("Password is required", 400);
    }
    if (!email) {
        throw new error_handler_middleware_1.default("Email is required", 400);
    }
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new error_handler_middleware_1.default("Invalid email or password", 400);
    }
    const isPasswordMatched = yield (0, bcrypt_util_1.compare)(password, user.password);
    if (!isPasswordMatched) {
        throw new error_handler_middleware_1.default("Invalid email or password", 400);
    }
    const token = (0, jwt_utils_1.generateJwTToken)({
        _id: user._id,
        email: user.email,
        user_name: user.user_name,
        full_name: user.full_name,
        role: user.role,
    });
    res.status(201).json({
        message: "User login success",
        data: user,
        success: true,
        access_token: token,
        status: "success",
    });
}));
