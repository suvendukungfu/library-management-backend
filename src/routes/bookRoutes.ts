import express from 'express';
import BookController from '../controllers/BookController';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Public Routes
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBook);

// Protected Routes (Admin only for modifications)
router.post('/', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, BookController.createBook);
router.put('/:id', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, BookController.updateBook);
router.delete('/:id', AuthMiddleware.verifyJWT, AuthMiddleware.verifyAdmin, BookController.deleteBook);

export default router;
