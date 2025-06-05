"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("../controllers/expense.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const enum_types_1 = require("../types/enum.types");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const upload = (0, upload_middleware_1.uploader)('receipts');
const router = express_1.default.Router();
router.post('/', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), upload.array('receipts', 3), expense_controller_1.create);
router.put('/:id', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), upload.array('receipts', 3), expense_controller_1.update);
router.get('/', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), expense_controller_1.getAllByUser);
router.get('/:categoryId', expense_controller_1.getAllUserExpByCategory);
router.delete('/:id', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), expense_controller_1.remove);
exports.default = router;
