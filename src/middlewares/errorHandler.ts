import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import Config from '../config/config';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, [], err.stack);
    }

    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
        ...(Config.env === 'development' && { stack: error.stack })
    };

    res.status(error.statusCode).json(response);
};

export default errorHandler;
