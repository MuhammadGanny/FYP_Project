import express from "express";
import authController from "../controllers/Controller.js";
import authMiddleware from "../middleware/Middleware.js";
// import User from '../models/UserData.js';
// import StudentProfile from '../models/StudentProfile.js';
// import CompanyProfile from '../models/CompanyProfile.js'

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
//router.post('/update-user-type', authMiddleware.verifyToken,authController.updateUserType)
//  async (req, res) => {
//     try {
//       const { userId, userType } = req.body;

//       // Update the user with the provided userType
//       // await User.updateOne({ _id: userId }, { userType });
//       await User.updateOne({ userID: userId }, { userType });

//       console.log('Received userType:', userType);
//       // Create the corresponding profile based on userType
//       if (userType === 'student') {
//         const newStudentProfile = new StudentProfile({ userId });
//         await newStudentProfile.save();
//       } else if (userType === 'company') {
//         const newCompanyProfile = new CompanyProfile({ userId });
//         await newCompanyProfile.save();
//       } else {
//         return res.status(400).json({ error: 'Invalid user type.22' });
//       }

//       res.json({ message: 'User type and profile setup successful.' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error.' });
//     }
//   });

router.use(authMiddleware.verifyToken);

export default router;
