import express from 'express';
import authRoutes from './authRoutes';
import bookRoutes from './bookRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);

export default router;
