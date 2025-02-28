import express from 'express';
import { addLike, removeLike, getLikes } from '../controllers/likeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addLike);
router.delete('/', authMiddleware, removeLike);
router.get('/:postId', getLikes);

export default router;