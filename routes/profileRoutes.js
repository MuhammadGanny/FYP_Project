import express from "express";
import profileController from "../controllers/profileController.js";
import authMiddleware from "../middleware/Middleware.js";
import upload from "../middleware/multerSetup.js";

const router = express.Router();

//router.post("/setup-profile", upload, profileController.setupProfile);
router.post("/setup-profile", profileController.setupProfile);

router.get("/profile", profileController.getProfile);

router.put("/update-profile", profileController.updateProfile);

router.use(authMiddleware.verifyToken);
// , async (req, res) => {
//   const { userId, updatedProfileData } = req.body;

//   try {
//     // Assuming there is a function in profileController to handle the profile update
//     await profileController.updateProfile(userId, updatedProfileData);

//     res.json({ message: 'Profile updated successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// });

export default router;

// app.post('/profile-setup', async (req, res) => {
//     const { userId, userType, profileData } = req.body;

//     try {
//       let profile;
//       if (userType === 'student') {
//         profile = new StudentProfile({ userId, ...profileData });
//       } else if (userType === 'company') {
//         profile = new CompanyProfile({ userId, ...profileData });
//       } else {
//         return res.status(400).json({ error: 'Invalid user type.' });
//       }

//       await profile.save();
//       res.json({ message: 'Profile setup successful.' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error.' });
//     }
//   });
