// const express = require('express');
import express from 'express';


import userController from '../controllers/userController.js'
const router = express.Router();

// const userController = require('../controllers/userController');


router.post('/register', userController.registerUser);


router.post('/login', userController.loginUser);

router.post('/:userId/profile', userController.createUserProfile);

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

router.get('/:userId', userController.getUserProfile);

router.put('/:userId', userController.updateUserProfile);

router.put('/:userId/profile-picture', userController.updateUserProfilePicture);


// module.exports = router;

export default router;