import StudentProfile from "../models/StudentProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import UserData from "../models/UserData.js";
import upload from "../middleware/multerSetup.js";

const setupProfile = async (req, res) => {
  try {
    const { userId, userType, profileData } = req.body;

    const file = req.file;

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

    const parsedProfileData = JSON.parse(profileData);

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
            profilePicture: file ? file.path : "",
          }
        : userType === "company"
        ? {
            companyName: parsedProfileData.companyName,
            description: parsedProfileData.description,
            products: parsedProfileData.products,
            services: parsedProfileData.services,
            profilePicture: file ? file.path : "",
          }
        : {}),
    });

    await newProfile.save();

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

    res
      .status(201)
      .json({ message: "Profile setup successful.", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId, userType } = req.query;

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

    const profileId = userData[userUpdateField];

    if (!profileId) {
      return res.status(404).json({ error: "Profile not found." });
    }

    const userProfile = await profileModel.findById(profileId);

    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    const { email } = userData;

    return res.status(200).json({ userProfile, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, userType } = req.body;
    const updatedProfileData = JSON.parse(req.body.profileData); // Extract the profile data from the request body

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

    const updatedProfile = await profileModel.findByIdAndUpdate(
      profileId,
      { ...updatedProfileData },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    return res.status(200).json({ updatedProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
// const updateProfile = async (req, res) => {
//   try {
//     const { userId, userType, updatedProfileData } = req.body;

//     let profileModel;
//     let userUpdateField;

//     if (userType === "student") {
//       profileModel = StudentProfile;
//       userUpdateField = "Sprofile";
//     } else if (userType === "company") {
//       profileModel = CompanyProfile;
//       userUpdateField = "Cprofile";
//     } else {
//       return res.status(400).json({ error: "Invalid user type." });
//     }

//     const userData = await UserData.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     const profileId = userData[userUpdateField];

//     if (!profileId) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     const updatedProfile = await profileModel.findOneAndUpdate(
//       { _id: profileId },

//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     return res.status(200).json({ updatedProfile });
//   } catch (error) {
//     console.error(error);

//     if (error.status) {
//       return res.status(error.status).json({ error: error.error });
//     } else {
//       return res.status(500).json({ error: "Internal server error." });
//     }
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     const { userId, userType } = req.body;
//     const updatedProfileData = JSON.parse(req.body.updatedProfileData);

//     let profileModel;
//     let userUpdateField;

//     if (userType === "student") {
//       profileModel = StudentProfile;
//       userUpdateField = "Sprofile";
//     } else if (userType === "company") {
//       profileModel = CompanyProfile;
//       userUpdateField = "Cprofile";
//     } else {
//       return res.status(400).json({ error: "Invalid user type." });
//     }

//     const userData = await UserData.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     const profileId = userData[userUpdateField];

//     if (!profileId) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     const updateFields = {
//       ...(userType === "student"
//         ? {
//             name: updatedProfileData.name,
//             university: updatedProfileData.university,
//             bio: updatedProfileData.bio,
//             projects: updatedProfileData.projects,
//             skills: updatedProfileData.skills,
//             experiences: updatedProfileData.experiences,
//             education: updatedProfileData.education,
//           }
//         : {
//             companyName: updatedProfileData.companyName,
//             description: updatedProfileData.description,
//             products: updatedProfileData.products,
//             services: updatedProfileData.services,
//           }),
//     };

//     if (req.file) {
//       updateFields.profilePicture = req.file.path;
//     }

//     const updatedProfile = await profileModel.findByIdAndUpdate(
//       profileId,
//       updateFields,
//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     return res
//       .status(200)
//       .json({ message: "Profile updated successfully", updatedProfile });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
//     console.log("Request file:", req.file);

//     const { userId, userType } = req.body;
//     const updatedProfileData = JSON.parse(req.body.updatedProfileData);

//     let profileModel;
//     let userUpdateField;

//     if (userType === "student") {
//       profileModel = StudentProfile;
//       userUpdateField = "Sprofile";
//     } else if (userType === "company") {
//       profileModel = CompanyProfile;
//       userUpdateField = "Cprofile";
//     } else {
//       return res.status(400).json({ error: "Invalid user type." });
//     }

//     const userData = await UserData.findById(userId);

//     if (!userData) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     const profileId = userData[userUpdateField];

//     if (!profileId) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     const updateFields = {
//       ...(userType === "student"
//         ? {
//             name: updatedProfileData.name,
//             university: updatedProfileData.university,
//             bio: updatedProfileData.bio,
//             projects: updatedProfileData.projects,
//             skills: updatedProfileData.skills,
//             experiences: updatedProfileData.experiences,
//             education: updatedProfileData.education,
//           }
//         : {
//             companyName: updatedProfileData.companyName,
//             description: updatedProfileData.description,
//             products: updatedProfileData.products,
//             services: updatedProfileData.services,
//           }),
//     };

//     if (req.file) {
//       updateFields.profilePicture = req.file.path;
//     }

//     console.log("Update fields:", updateFields);

//     const updatedProfile = await profileModel.findByIdAndUpdate(
//       profileId,
//       updateFields,
//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     return res
//       .status(200)
//       .json({ message: "Profile updated successfully", updatedProfile });
//   } catch (error) {
//     console.error("Error in updateProfile:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };
// const updateProfile = async (req, res) => {
//   try {
//     const { userId, userType, updatedProfileData } = req.body;
//     const file = req.file;

//     let profileModel;
//     let userUpdateField;

//     if (userType === "student") {
//       profileModel = StudentProfile;
//       userUpdateField = "Sprofile";
//     } else if (userType === "company") {
//       profileModel = CompanyProfile;
//       userUpdateField = "Cprofile";
//     } else {
//       return res.status(400).json({ error: "Invalid user type." });
//     }

//     const userData = await UserData.findById(userId);
//     if (!userData) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     const profileId = userData[userUpdateField];
//     if (!profileId) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     const parsedProfileData = JSON.parse(updatedProfileData);
//     const updateFields = { ...parsedProfileData };

//     if (file) {
//       updateFields.profilePicture = file.path;
//     }

//     const updatedProfile = await profileModel.findOneAndUpdate(
//       { _id: profileId },
//       updateFields,
//       { new: true }
//     );

//     if (!updatedProfile) {
//       return res.status(404).json({ error: "Profile not found." });
//     }

//     return res.status(200).json({ updatedProfile });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// };

export default { setupProfile, getProfile, updateProfile };
