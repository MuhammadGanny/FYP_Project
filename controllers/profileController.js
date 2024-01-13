import StudentProfile from '../models/StudentProfile.js';
import CompanyProfile from '../models/CompanyProfile.js';

const setupProfile = async (req, res) => {
  try {
    const { userId, userType, profileData } = req.body;

    // Check the user type and save the profile accordingly
    if (userType === 'student') {
      const newStudentProfile = new StudentProfile({ userID: userId, ...profileData });
      await newStudentProfile.save();
    } else if (userType === 'company') {
      const newCompanyProfile = new CompanyProfile({ userID: userId, ...profileData });
      await newCompanyProfile.save();
    } else {
      return res.status(400).json({ error: 'Invalid user type.' });
    }

    // Return success message
    res.status(201).json({ message: 'Profile setup successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    // Fetch the user profile based on userType
    let userProfile;
    if (userType === 'student') {
      userProfile = await StudentProfile.findOne({ userID: userId });
    } else if (userType === 'company') {
      userProfile = await CompanyProfile.findOne({ userID: userId });
    } else {
      return res.status(400).json({ error: 'Invalid user type.' });
    }

    // Return the user profile
    res.json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateProfile = async (userId, updatedProfileData) => {
    try {
      // Determine the user type based on the provided profile data
      const userType = updatedProfileData.userType;
  
      let profileModel;
      if (userType === 'student') {
        profileModel = StudentProfile;
      } else if (userType === 'company') {
        profileModel = CompanyProfile;
      } else {
        throw new Error('Invalid user type.');
      }
  
      // Find and update the user profile
      await profileModel.findOneAndUpdate({ userId }, updatedProfileData);
    } catch (error) {
      throw error;
    }
  };
  

export default { setupProfile, getProfile,updateProfile };
