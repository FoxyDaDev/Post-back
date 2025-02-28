import express from 'express';
import { signupUser, loginUser, getUserProfile, getAllUsers } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/all', authMiddleware, getAllUsers);

export default router;