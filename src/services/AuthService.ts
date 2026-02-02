import UserRepository from '../repositories/UserRepository';
import ApiError from '../utils/ApiError';
import { IUser } from '../models/User';

class AuthService {
    async register(data: Partial<IUser>): Promise<IUser> {
        const existingUser = await UserRepository.findByEmail(data.email!);
        if (existingUser) {
            throw new ApiError(409, 'User with email already exists');
        }

        const user = await UserRepository.create(data);
        const createdUser = await UserRepository.findById(String(user._id));

        if (!createdUser) {
            throw new ApiError(500, 'Something went wrong while registering the user');
        }

        return createdUser;
    }

    async login(email: string, password: string): Promise<{ user: IUser; accessToken: string }> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(404, 'User does not exist');
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid user credentials');
        }

        const accessToken = user.generateAccessToken();
        const loggedInUser = await UserRepository.findById(String(user._id));

        if (!loggedInUser) throw new ApiError(500, 'Error fetching user after login');

        return { user: loggedInUser, accessToken };
    }
}

export default new AuthService();
