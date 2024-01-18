import StudentProfile from "../models/StudentProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import UserData from "../models/UserData.js"; // Import UserData model
import multer from "../middleware/multerSetup.js";

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// }).single('profilePicture');

// const setupProfile = async (req, res) => {
//   try {
//     const { userId, userType, profileData } = req.body;

//     let profileModel;
//     let userUpdateField;

//     // Check the user type and save the profile accordingly
//     if (userType === 'student') {
//       profileModel = StudentProfile;
//       userUpdateField = 'Sprofile';
//     } else if (userType === 'company') {
//       profileModel = CompanyProfile;
//       userUpdateField = 'Cprofile';
//     } else {
//       return res.status(400).json({ error: 'Invalid user type.' });
//     }

//     // Create a new profile
//     const newProfile = new profileModel({ userID: userId, ...profileData });
//     await newProfile.save();

//     // Update UserData with the new profile ID
//     const updateQuery = { [userUpdateField]: newProfile._id };
//     const updatedUser = await UserData.findByIdAndUpdate(userId, updateQuery, { new: true });

//     // Return success message and updated user data
//     res.status(201).json({ message: 'Profile setup successful.', user: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

//profile picture is must
// const setupProfile = async (req, res) => {
//   try {
//     const { userId, userType, profileData } = req.body;

//     let profileModel;
//     let userUpdateField;

//     // Check the user type and save the profile accordingly
//     if (userType === 'student') {
//       profileModel = StudentProfile;
//       userUpdateField = 'Sprofile';
//     } else if (userType === 'company') {
//       profileModel = CompanyProfile;
//       userUpdateField = 'Cprofile';
//     } else {
//       return res.status(400).json({ error: `Invalid user type: ${userType}. Supported types are 'student' and 'company'.` });
//       // return res.status(400).json({ error: 'Invalid user type.' });
//     }

//      // Check if a file is uploaded
//      multer(req, res, async (err) => {
//       if (err) {
//         console.error(err);

//         // Handle file upload error
//         if (err instanceof multer.MulterError) {
//           return res.status(400).json({ error: 'File upload error.' });
//         }

//         return res.status(500).json({ error: 'Internal server error.' });
//       }

//       // Get the uploaded file data
//       const file = req.file;

//       // Check if a file is uploaded
//       if (!file) {
//         return res.status(400).json({ error: 'No file uploaded.' });
//       }

//       // Create a new profile with profile picture
//       const newProfile = new profileModel({ userID: userId, profilePicture: file.buffer, ...profileData });
//       await newProfile.save();

//       // Update UserData with the new profile ID and profile picture
//       const updateQuery = { [userUpdateField]: newProfile._id, profilePicture: file.buffer };
//       const updatedUser = await UserData.findByIdAndUpdate(userId, updateQuery, { new: true });

//       console.log('Setup Profile Data:', {
//         userId,
//         userType,
//         profileData,
//         newProfile,
//         updatedUser,
//       });

//       // Return success message and updated user data
//       res.status(201).json({ message: 'Profile setup successful.', user: updatedUser });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

//no data is needed jo bhimile us se bana lega
// const setupProfile = async (req, res) => {
//   try {
//     const { userId, userType, profileData } = req.body;

//     let profileModel;
//     let userUpdateField;

//     // Check the user type and save the profile accordingly
//     if (userType === 'student') {
//       profileModel = StudentProfile;
//       userUpdateField = 'Sprofile';
//     } else if (userType === 'company') {
//       profileModel = CompanyProfile;
//       userUpdateField = 'Cprofile';
//     } else {
//       return res.status(400).json({ error: `Invalid user type: ${userType}. Supported types are 'student' and 'company'.` });
//     }

//     // Check if a file is uploaded
//     multer(req, res, async (err) => {
//       if (err) {
//         console.error(err);

//         // Handle file upload error
//         if (err instanceof multer.MulterError) {
//           return res.status(400).json({ error: 'File upload error.' });
//         }

//         return res.status(500).json({ error: 'Internal server error.' });
//       }

//       // Get the uploaded file data
//       const file = req.file;

//       // If no profileData is provided, create an empty object
//       const profileDataToSave = profileData || {};

//       // Create a new profile with profile picture
//       const newProfile = new profileModel({ userID: userId, profilePicture: file.buffer, ...profileDataToSave });
//       await newProfile.save();

//       // Update UserData with the new profile ID and profile picture
//       const updateQuery = { [userUpdateField]: newProfile._id, profilePicture: file.buffer };
//       const updatedUser = await UserData.findByIdAndUpdate(userId, updateQuery, { new: true });

//       console.log('Setup Profile Data:', {
//         userId,
//         userType,
//         profileData,
//         newProfile,
//         updatedUser,
//       });

//       // Return success message and updated user data
//       res.status(201).json({ message: 'Profile setup successful.', user: updatedUser });
//     });
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
    if (userType === "student") {
      profileModel = StudentProfile;
      userUpdateField = "Sprofile";
    } else if (userType === "company") {
      profileModel = CompanyProfile;
      userUpdateField = "Cprofile";
    } else {
      return res.status(400).json({
        error: `Invalid user type: ${userType}. Supported types are 'student' and 'company'.`,
      });
    }

    // Check if a file is uploaded
    multer(req, res, async (err) => {
      if (err) {
        console.error(err);

        // Handle file upload error
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: "File upload error." });
        }

        return res.status(500).json({ error: "Internal server error." });
      }

      // Get the uploaded file data
      const file = req.file;

      // Create a new profile with or without profile picture
      const newProfile = new profileModel({ userID: userId, ...profileData });

      // If a file is uploaded, set the profile picture
      if (file) {
        newProfile.profilePicture = file.buffer;
      }

      await newProfile.save();

      // Update UserData with the new profile ID and profile picture
      const updateQuery = {
        [userUpdateField]: newProfile._id,
        profilePicture: file?.buffer,
      };
      const updatedUser = await UserData.findByIdAndUpdate(
        userId,
        updateQuery,
        { new: true }
      );

      console.log("Setup Profile Data:", {
        userId,
        userType,
        profileData,
        newProfile,
        updatedUser,
      });

      // Return success message and updated user data
      res
        .status(201)
        .json({ message: "Profile setup successful.", user: updatedUser });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId, userType } = req.query; // Use req.query to get parameters from the URL

    if (!userId || !userType) {
      return res
        .status(400)
        .json({ error: "Missing userId or userType in the request." });
    }
    let profileModel;
    let userUpdateField;

    if (userType === "student") {
      profileModel = StudentProfile;
      userUpdateField = "Sprofile";
    } else if (userType === "company") {
      profileModel = CompanyProfile;
      userUpdateField = "Cprofile";
    } else {
      return res.status(400).json({ error: "Invalid user type." });
    }
    const userData = await UserData.findById(userId);

    if (!userData) {
      return res.status(404).json({ error: "User not found." });
    }

    // Get the profile ID from the user data
    const profileId = userData[userUpdateField];

    if (!profileId) {
      return res.status(404).json({ error: "Profile not found." });
    }

    const updatedProfile = await profileModel.findById(profileId);
    // const updatedProfile = await profileModel.findOne(
    //   { _id: profileId }
    //   // { $set: updatedProfileData},
    //   // { new: true }
    // );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    return res.status(200).json({ updatedProfile });

    // Return the user profile
    // res.json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// const getProfile = async (req, res) => {
//   try {
//     const { userId, userType } = req.body;

//     // Fetch the user profile based on userType
//     let userProfile;
//     if (userType === 'student') {
//       userProfile = await StudentProfile.findOne({ userID: userId });
//     } else if (userType === 'company') {
//       userProfile = await CompanyProfile.findOne({ userID: userId });
//     } else {
//       return res.status(400).json({ error: 'Invalid user type.' });
//     }

//     // Return the user profile
//     res.json({ userProfile });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     const { userId, userType, updatedProfileData } = req.body;

//     // Determine the user type based on the provided profile data
//     let profileModel;
//     let userUpdateField;

//     if (userType === 'student') {
//       profileModel = StudentProfile;
//       userUpdateField = 'Sprofile';
//     } else if (userType === 'company') {
//       profileModel = CompanyProfile;
//       userUpdateField = 'Cprofile';
//     } else {
//       return res.status(400).json({ error: 'Invalid user type.' });
//     }

//     // Find the user data to get the profile ID
//     const userData = await UserData.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     // Get the profile ID from the user data
//     const profileId = userData[userUpdateField];

//     if (!profileId) {
//       return res.status(404).json({ error: 'Profile not found.' });
//     }

//     // Find the profile by ID
//     const existingProfile = await profileModel.findById(profileId);

//     if (!existingProfile) {
//       return res.status(404).json({ error: 'Profile not found.' });
//     }

//     // Check if updatedProfileData is an object
//     if (typeof updatedProfileData === 'object' && updatedProfileData !== null) {
//       // Update the profile data
//       for (const [key, value] of Object.entries(updatedProfileData)) {
//         existingProfile[key] = value;
//       }

//       // Save the updated profile
//       const updatedProfile = await existingProfile.save();

//       // Return the updated profile
//       return res.status(200).json({ updatedProfile });
//     } else {
//       return res.status(400).json({ error: 'Invalid updated profile data.' });
//     }
//   } catch (error) {
//     // Handle unexpected errors
//     console.error(error);

//     if (error.status) {
//       // If the error has a status, return it
//       return res.status(error.status).json({ error: error.error });
//     } else {
//       // If it's an unexpected error, return a 500 status
//       return res.status(500).json({ error: 'Internal server error.' });
//     }
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     const { userId, userType, updatedProfileData } = req.body;

//     // Determine the user type based on the provided profile data
//     let profileModel;
//     let userUpdateField;

//     if (userType === 'student') {
//       profileModel = StudentProfile;
//       userUpdateField = 'Sprofile';
//     } else if (userType === 'company') {
//       profileModel = CompanyProfile;
//       userUpdateField = 'Cprofile';
//     } else {
//       return res.status(400).json({ error: 'Invalid user type.' });
//     }

//     // Find the user data to get the profile ID
//     const userData = await UserData.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     // Log the user data and user update field
//     console.log('userData:', userData);
//     console.log('userUpdateField:', userUpdateField);

//     // Get the profile ID from the user data
//     const profileId = userData[userUpdateField];

//     if (!profileId) {
//       return res.status(404).json({ error: 'Profile not found.' });
//     }

//     // Log the profile ID
//     console.log('profileId:', profileId);

//     // Find and update the user profile using the profile ID
//     const updatedProfile = await profileModel.findOneAndUpdate(
//       { _id: profileId },
//       updatedProfileData,
//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({ error: 'Profile not found.' });
//     }

//     // Log the updated profile
//     console.log('updatedProfile:', updatedProfile);

//     return res.status(200).json({ updatedProfile });
//   } catch (error) {
//     // Handle unexpected errors
//     console.error(error);

//     if (error.status) {
//       // If the error has a status, return it
//       return res.status(error.status).json({ error: error.error });
//     } else {
//       // If it's an unexpected error, return a 500 status
//       return res.status(500).json({ error: 'Internal server error.' });
//     }
//   }
// };

const updateProfile = async (req, res) => {
  try {
    const { userId, userType, updatedProfileData } = req.body;

    // Determine the user type based on the provided profile data
    let profileModel;
    let userUpdateField;

    if (userType === "student") {
      profileModel = StudentProfile;
      userUpdateField = "Sprofile";
    } else if (userType === "company") {
      profileModel = CompanyProfile;
      userUpdateField = "Cprofile";
    } else {
      return res.status(400).json({ error: "Invalid user type." });
    }

    // Find the user data to get the profile ID
    const userData = await UserData.findById(userId);

    if (!userData) {
      return res.status(404).json({ error: "User not found." });
    }

    // Get the profile ID from the user data
    const profileId = userData[userUpdateField];

    if (!profileId) {
      return res.status(404).json({ error: "Profile not found." });
    }

    // Find and update the user profile using the profile ID
    const updatedProfile = await profileModel.findOneAndUpdate(
      { _id: profileId },
      // { $set: updatedProfileData},
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    return res.status(200).json({ updatedProfile });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);

    if (error.status) {
      // If the error has a status, return it
      return res.status(error.status).json({ error: error.error });
    } else {
      // If it's an unexpected error, return a 500 status
      return res.status(500).json({ error: "Internal server error." });
    }
  }
};

export default { setupProfile, getProfile, updateProfile };

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
