// const express = require('express');
import express from 'express';
const router = express.Router();

import postController from "../controllers/postController.js"
//const postController = require('../controllers/postController');



router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);

// module.exports = router;

export default router;