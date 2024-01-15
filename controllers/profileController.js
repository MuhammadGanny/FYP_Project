import StudentProfile from '../models/StudentProfile.js';
import CompanyProfile from '../models/CompanyProfile.js';
import UserData from '../models/UserData.js'; // Import UserData model

// const setupProfile = async (req, res) => {
//   try {
//     const { userId, userType, profileData } = req.body;

//     let profileModel;

//     // Check the user type and save the profile accordingly
//     if (userType === 'student') {
//       profileModel = StudentProfile;
//     } else if (userType === 'company') {
//       profileModel = CompanyProfile;
//     } else {
//       return res.status(400).json({ error: 'Invalid user type.' });
//     }

//     // Create a new profile
//     const newProfile = new profileModel({ userID: userId, ...profileData });
//     await newProfile.save();

//     // Update UserData with the new profile ID
//     const userUpdateField = userType === 'student' ? 'Sprofile' : 'Cprofile';
//     const updateQuery = { [userUpdateField]: newProfile._id };
//     const updatedUser = await UserData.findByIdAndUpdate(userId, updateQuery, { new: true });

//     // Return success message and updated user data
//     res.status(201).json({ message: 'Profile setup successful.', user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };
const setupProfile = async (req, res) => {
  try {
    const { userId, userType, profileData } = req.body;

    let profileModel;
    let userUpdateField;

    // Check the user type and save the profile accordingly
    if (userType === 'student') {
      profileModel = StudentProfile;
      userUpdateField = 'Sprofile';
    } else if (userType === 'company') {
      profileModel = CompanyProfile;
      userUpdateField = 'Cprofile';
    } else {
      return res.status(400).json({ error: 'Invalid user type.' });
    }

    // Create a new profile
    const newProfile = new profileModel({ userID: userId, ...profileData });
    await newProfile.save();

    // Update UserData with the new profile ID
    const updateQuery = { [userUpdateField]: newProfile._id };
    const updatedUser = await UserData.findByIdAndUpdate(userId, updateQuery, { new: true });

    // Return success message and updated user data
    res.status(201).json({ message: 'Profile setup successful.', user: updatedUser });
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
