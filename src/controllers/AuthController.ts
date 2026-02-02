import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';

class AuthController {
    register = asyncHandler(async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;

        const user = await AuthService.register({ name, email, password, role });

        res.status(201).json(
            new ApiResponse(201, user, 'User registered successfully')
        );
    });

    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const { user, accessToken } = await AuthService.login(email, password);

        res.status(200).json(
            new ApiResponse(200, { user, accessToken }, 'User logged in successfully')
        );
    });

    getProfile = asyncHandler(async (req: Request, res: Response) => {
        // req.user is set by auth middleware
        res.status(200).json(
            new ApiResponse(200, req.user, 'User profile fetched successfully')
        );
    });
}

export default new AuthController();
