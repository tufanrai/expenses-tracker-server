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
exports.Authenticate = void 0;
const error_handler_middleware_1 = __importDefault(require("./error-handler.middleware"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const Authenticate = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const auth_header = req.headers["authorization"];
            if (!auth_header) {
                throw new error_handler_middleware_1.default("Unauthorized, access denied", 401);
            }
            if (auth_header.split(" ").length !== 2 &&
                !auth_header.startsWith("BEARER")) {
                throw new error_handler_middleware_1.default("Unauthorized, access denied", 401);
            }
            const token = auth_header.split(" ")[1];
            if (!token) {
                throw new error_handler_middleware_1.default("Unauthorized, access denied", 401);
            }
            const decoded = (0, jwt_utils_1.verifyJWT)(token);
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                throw new error_handler_middleware_1.default("Unauthorized, token expired", 401);
            }
            const user = yield user_model_1.default.findOne({ _id: decoded._id });
            if (!user) {
                throw new error_handler_middleware_1.default("User not found ", 401);
            }
            if (roles && !roles.includes(user.role)) {
                throw new error_handler_middleware_1.default("Users role did not matched", 403);
            }
            req.user = {
                _id: decoded._id,
                email: decoded.email,
                user_name: decoded.user_name,
                full_name: decoded.full_name,
                role: decoded.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.Authenticate = Authenticate;
