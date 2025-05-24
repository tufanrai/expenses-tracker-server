"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
