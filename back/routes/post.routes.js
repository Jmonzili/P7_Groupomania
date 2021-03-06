const router = require('express').Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const upload = multer();

//  Routes post
router.get('/', postController.readPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unLikePost);

//  Routes comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router;
