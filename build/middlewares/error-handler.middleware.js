"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.success = false;
        Error.captureStackTrace(this, CustomError);
    }
}
const errorHandler = (err, req, res, next) => {
    console.log(err);
    const message = err.message || 'Something went wrong';
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const success = err.success || false;
    res.status(statusCode).json({
        message,
        status,
        success
    });
};
exports.errorHandler = errorHandler;
exports.default = CustomError;
