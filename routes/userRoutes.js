// const express = require('express');
import express from 'express';


import userController from '../controllers/userController.js'
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);


router.post('/login', userController.loginUser);



// Update bio
router.put('/:userId/bio', userController.updateBio);

// Update projects
router.put('/:userId/projects', userController.updateProjects);

// Update skills
router.put('/:userId/skills',userController.updateSkills);

// Update experiences
router.put('/:userId/experiences', userController.updateExperiences);

// Update education
router.put('/:userId/education', userController.updateEducation);

// router.get('/:userId', userController.getUserProfile);

router.put('/:userId', userController.updateUserProfile);

router.put('/:userId/profile-picture', userController.updateUserProfilePicture);
// router.post('/:userId/profile', userController.createUserProfile);
// router.get('/currentuser', userController.getCurrentUser);
// router.get('/currentuser', authenticateToken, userController.getCurrentUser);
// router.post('/:userId/profile', authenticateToken, userController.createUserProfile);
router.get('/profile/:userId', userController.getUserProfile); // Modify this if needed
router.post('/profile/:userId', userController.createUserProfile); // Modify this if needed
router.get('/currentuser/:userId', userController.getCurrentUser); // Updated route
// module.exports = router;

export default router;