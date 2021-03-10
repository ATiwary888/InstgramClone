import express from 'express';

import { getPosts,createPost, loginUser, updatePost, deletePost, likePost, createUser} from '../controllers/post.js';

const router = express.Router();

router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);
router.post('/login',loginUser);
router.post('/creat',createUser);
export default router;

