import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import Config from './config/config';
import Database from './config/database';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
import ApiError from './utils/ApiError';

class App {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Config.port;

        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private async initializeDatabase(): Promise<void> {
        await Database.connect();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(): void {
        // Health Check
        this.app.get('/', (req, res) => {
            res.status(200).json({ status: 'OK', message: 'Library Management API is running (TypeScript)' });
        });

        // API Routes
        this.app.use('/api/v1', routes);

        // 404 Handler
        this.app.use((req, res, next) => {
            next(new ApiError(404, 'Route not found'));
        });
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server is running on port ${this.port} in ${Config.env} mode`);
        });
    }
}

// Instantiate and start the app
if (require.main === module) {
    const app = new App();
    app.listen();
}

export default App;
