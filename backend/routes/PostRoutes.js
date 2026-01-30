import express from "express";
import { createPost,getPublicPost,UpdatePost,deletePost } from "../controllers/postController.js";
import protect from '../middleware/authMiddleware.js'
const router  = express.Router()

router.post('/write',protect,createPost)
router.put('/:id', protect, UpdatePost)
router.get('/',getPublicPost)
router.delete('/:id',protect, deletePost)

export default router