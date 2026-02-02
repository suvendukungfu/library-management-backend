import dotenv from 'dotenv';

dotenv.config();

class Config {
    static get port(): number {
        return parseInt(process.env.PORT || '3000', 10);
    }

    static get mongoUri(): string {
        return process.env.MONGO_URI || 'mongodb://localhost:27017/library_management';
    }

    static get jwtSecret(): string {
        return process.env.JWT_SECRET || 'super_secret_key_123';
    }

    static get jwtExpiresIn(): string {
        return process.env.JWT_EXPIRES_IN || '1d';
    }

    static get env(): string {
        return process.env.NODE_ENV || 'development';
    }
}

export default Config;
