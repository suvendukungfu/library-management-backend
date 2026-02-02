import express from 'express';
import AuthController from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/authMiddleware';
import ValidatorMiddleware from '../middlewares/validatorMiddleware';
import { body } from 'express-validator';

const router = express.Router();

const registerValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/register', ValidatorMiddleware.validate(registerValidation), AuthController.register);
router.post('/login', ValidatorMiddleware.validate(loginValidation), AuthController.login);
router.get('/me', AuthMiddleware.verifyJWT, AuthController.getProfile);

export default router;
