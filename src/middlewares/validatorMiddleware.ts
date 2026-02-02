import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import ApiError from '../utils/ApiError';

class ValidatorMiddleware {
    static validate(validations: ValidationChain[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            await Promise.all(validations.map(validation => validation.run(req)));

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }

            const extractedErrors: any[] = [];
            errors.array().map(err => extractedErrors.push({ [err.type]: err.msg })); // Fix: err.param is now err.type or check docs, but array() gives ValidationError

            throw new ApiError(400, 'Validation Error', extractedErrors);
        };
    }
}

export default ValidatorMiddleware;
