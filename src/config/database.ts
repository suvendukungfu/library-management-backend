import mongoose from 'mongoose';
import Config from './config';

class Database {
    static async connect(): Promise<void> {
        try {
            await mongoose.connect(Config.mongoUri);
            console.log('✅ Database connected successfully');
        } catch (error: any) {
            console.error('❌ Database connection failed:', error.message);
            process.exit(1);
        }
    }
}

export default Database;
