import StudentProfile from "../models/StudentProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import UserData from "../models/UserData.js";
import upload from "../middleware/multerSetup.js";

// const setupProfile = async (req, res) => {
//   try {
//     const { userId, userType, profileData } = req.body;
//     console.log("Profile Data:", profileData);
//     const parsedProfileData = JSON.parse(profileData);

//     let profileModel;
//     let userUpdateField;

//     if (userType === "student") {
//       profileModel = StudentProfile;
//       userUpdateField = "Sprofile";
//     } else if (userType === "company") {
//       profileModel = CompanyProfile;
//       userUpdateField = "Cprofile";
//     } else {
//       return res.status(400).json({
//         error: `Invalid user type: ${userType}. Supported types are 'student' and 'company'.`,
//       });
//     }

//     upload(req, res, async (err) => {
//       if (err) {
//         console.error(err);

//         if (err instanceof multer.MulterError) {
//           return res.status(400).json({ error: "File upload error." });
//         }

//         return res.status(500).json({ error: "Internal server error." });
//       }

//       const file = req.file;

//       const parsedProfileData = JSON.parse(profileData);

//       const newProfile = new profileModel({
//         userID: userId,
//         ...(userType === "student"
//           ? {
//               name: parsedProfileData.name,
//               university: parsedProfileData.university,
//               bio: parsedProfileData.bio,
//               projects: parsedProfileData.projects,
//               skills: parsedProfileData.skills,
//               experiences: parsedProfileData.experiences,
//               education: parsedProfileData.education,
//             }
//           : userType === "company"
//           ? {
//               companyName: parsedProfileData.companyName,
//               description: parsedProfileData.description,
//               products: parsedProfileData.products,
//               services: parsedProfileData.services,
//             }
//           : {}),
//       });

//       if (file) {
//         newProfile.profilePicture = file.path;
//       }

//       await newProfile.save();

//       const updateQuery = {
//         [userUpdateField]: newProfile._id,
//         // profilePicture: file?.buffer,
//       };
//       const updatedUser = await UserData.findByIdAndUpdate(
//         userId,
//         updateQuery,
//         { new: true }
//       );

//       console.log("Setup Profile Data:", {
//         userId,
//         userType,
//         profileData: parsedProfileData,
//         newProfile,
//         updatedUser,
//       });

//       res
//         .status(201)
//         .json({ message: "Profile setup successful.", user: updatedUser });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };

// const setupProfile = async (req, res) => {
//   try {
//     const { userId, userType, profileData } = req.body;

//     // Handle file upload
//     upload(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "File upload error." });
//       }

//       const file = req.file;

//       // Construct profile model based on user type
//       let profileModel;
//       let userUpdateField;
//       if (userType === "student") {
//         profileModel = StudentProfile;
//         userUpdateField = "Sprofile";
//       } else if (userType === "company") {
//         profileModel = CompanyProfile;
//         userUpdateField = "Cprofile";
//       } else {
//         return res.status(400).json({
//           error: `Invalid user type: ${userType}. Supported types are 'student' and 'company'.`,
//         });
//       }

//       // Parse profile data
//       const parsedProfileData = JSON.parse(profileData);

//       // Create new profile document
//       const newProfile = new profileModel({
//         userID: userId,
//         ...(userType === "student"
//           ? {
//               name: parsedProfileData.name,
//               university: parsedProfileData.university,
//               bio: parsedProfileData.bio,
//               projects: parsedProfileData.projects,
//               skills: parsedProfileData.skills,
//               experiences: parsedProfileData.experiences,
//               education: parsedProfileData.education,
//             }
//           : userType === "company"
//           ? {
//               companyName: parsedProfileData.companyName,
//               description: parsedProfileData.description,
//               products: parsedProfileData.products,
//               services: parsedProfileData.services,
//             }
//           : {}),
//       });

//       // Save profile picture path if uploaded
//       if (file) {
//         newProfile.profilePicture = file.path;
//       }

//       // Save profile document
//       await newProfile.save();

//       // Update user document with profile ID
//       const updateQuery = {
//         [userUpdateField]: newProfile._id,
//       };
//       const updatedUser = await UserData.findByIdAndUpdate(
//         userId,
//         updateQuery,
//         { new: true }
//       );

//       console.log("Setup Profile Data:", {
//         userId,
//         userType,
//         profileData: parsedProfileData,
//         newProfile,
//         updatedUser,
//       });

//       // Send response
//       res
//         .status(201)
//         .json({ message: "Profile setup successful.", user: updatedUser });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };

const setupProfile = async (req, res) => {
  try {
    const { userId, userType, profileData } = req.body;

    // Handle file upload
    // upload(req, res, async (err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ error: "File upload error." });
    //   }


    const file = req.file;

    // Construct profile model based on user type
    let profileModel;
    let userUpdateField;
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

    // Parse profile data
    const parsedProfileData = JSON.parse(profileData);

    // Create new profile document
    const newProfile = new profileModel({
      userID: userId,
      ...(userType === "student"
        ? {
            name: parsedProfileData.name,
            university: parsedProfileData.university,
            bio: parsedProfileData.bio,
            projects: parsedProfileData.projects,
            skills: parsedProfileData.skills,
            experiences: parsedProfileData.experiences,
            education: parsedProfileData.education,
            profilePicture: file ? file.path : "", // Set profile picture path if uploaded
          }
        : userType === "company"
        ? {
            companyName: parsedProfileData.companyName,
            description: parsedProfileData.description,
            products: parsedProfileData.products,
            services: parsedProfileData.services,
            profilePicture: file ? file.path : "", // Set profile picture path if uploaded
          }
        : {}),
    });

    // Save profile document
    await newProfile.save();

    // Update user document with profile ID
    const updateQuery = {
      [userUpdateField]: newProfile._id,
    };
    const updatedUser = await UserData.findByIdAndUpdate(userId, updateQuery, {
      new: true,
    });

    console.log("Setup Profile Data:", {
      userId,
      userType,
      profileData: parsedProfileData,
      newProfile,
      updatedUser,
    });

    // Send response
    res
      .status(201)
      .json({ message: "Profile setup successful.", user: updatedUser });
    // });
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

    const userProfile = await profileModel.findById(profileId);

    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    const { email } = userData;
    // console.log(email);

    return res.status(200).json({ userProfile, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, userType, updatedProfileData } = req.body;

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

    const profileId = userData[userUpdateField];

    if (!profileId) {
      return res.status(404).json({ error: "Profile not found." });
    }

    const updatedProfile = await profileModel.findOneAndUpdate(
      { _id: profileId },

      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    return res.status(200).json({ updatedProfile });
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({ error: error.error });
    } else {
      return res.status(500).json({ error: "Internal server error." });
    }
  }
};

export default { setupProfile, getProfile, updateProfile };
