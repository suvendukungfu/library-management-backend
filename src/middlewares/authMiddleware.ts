import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/asyncHandler';
import Config from '../config/config';
import User from '../models/User';

interface DecodedToken extends JwtPayload {
    _id: string;
}

class AuthMiddleware {
    static verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new ApiError(401, 'Unauthorized request');
        }

        try {
            const decoded = jwt.verify(token, Config.jwtSecret) as DecodedToken;
            const user = await User.findById(decoded._id).select('-password');

            if (!user) {
                throw new ApiError(401, 'Invalid Access Token');
            }

            req.user = user;
            next();
        } catch (error) {
            throw new ApiError(401, 'Invalid Access Token');
        }
    });

    static verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            next(new ApiError(403, 'Access denied. Admins only.'));
        }
    };
}

export default AuthMiddleware;
