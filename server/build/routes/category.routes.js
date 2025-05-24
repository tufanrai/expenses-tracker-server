"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
router.post('/', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), category_controller_1.create);
router.put('/:id', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), category_controller_1.update);
router.get('/:id', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER, enum_types_1.Role.ADMIN]), category_controller_1.getById);
router.get('/', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.ADMIN]), category_controller_1.getAll);
router.get('/user', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), category_controller_1.getAllUserCategory);
router.delete('/:id', (0, authentication_middleware_1.Authenticate)([enum_types_1.Role.USER]), category_controller_1.remove);
exports.default = router;
