import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../config/config';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    isPasswordCorrect(password: string): Promise<boolean>;
    generateAccessToken(): string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'] as any
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

// Pre-save hook for hashing password
userSchema.pre('save', async function (next: any) {
    const user = this as IUser;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

// Method to check password
userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

// Method to generate Access Token
userSchema.methods.generateAccessToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
            name: this.name
        },
        Config.jwtSecret,
        {
            expiresIn: Config.jwtExpiresIn
        } as jwt.SignOptions
    );
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
