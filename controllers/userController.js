import { User, UserProfile } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import upload from '../middleware/multerSetup.js';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

// const registerUser = async (req, res) => {
//   const { name, email, password, phone, university } = req.body;

//   if (!name || !email || !password || !phone) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   // Generate a custom userId
//   const userId = uuidv4(); // This will create a unique user ID

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     userId, // Assign the generated userId
//     name,
//     email,
//     password: hashedPassword,
//     phone,
//     university,
//   });

//   try {
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ error: 'Error registering user' });
//   }
// };
const registerUser = async (req, res) => {
  const { name, email, password, phone, university } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists. Please use a different email' });
    }

    // Generate a custom userId
    const userId = uuidv4(); // This will create a unique user ID

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId, // Assign the generated userId
      name,
      email,
      password: hashedPassword,
      phone,
      university,
    });

    await newUser.save();

    const userProfile = new UserProfile({
      userId,
      // Other fields of the user profile, initialized as empty for now
      bio: '',
      projects: [],
      skills: [],
      experiences: [],
      education: [],
      // Add other fields as needed
    });

    await userProfile.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate JWT token
            // const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });
            // localStorage.setItem('token', response.data.token);
            const token = jwt.sign({ userId: user.userId }, 'your_secret_key_here', {
              expiresIn: '1h', // Set expiration time for the token
            });

            res.status(200).json({ message: "User logged in successfully", token });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
  
    
//     const user = await User.findOne({ email });
  
//     if (!user) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }
  
    
//     const passwordMatch = await bcrypt.compare(password, user.password);
  
//     if (passwordMatch) {
//       res.status(200).json({ message: "User logged in successfully" });
//     } else {
//       res.status(401).json({ error: "Invalid email or password" });
//     }
// };

const createUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, projects, skills, experiences, education } = req.body;

    // Fetch the user by userId from the User model
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user profile already exists
    let userProfile = await UserProfile.findOne({ userId });

    if (userProfile) {
      return res.status(400).json({ error: 'User profile already exists' });
    }

    // Create a new user profile
    userProfile = new UserProfile({
      userId: user.userId, // Use the userId from the User model
      bio,
      projects,
      skills,
      experiences,
      education,
    });

    await userProfile.save();

    res.status(201).json({ message: 'User profile created successfully', userProfile });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Error creating user profile' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Assuming you have a UserProfile model
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // If the user profile exists, return it
    res.status(200).json({ userProfile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { bio, projects, skills, experiences, education } = req.body;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    let userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      userProfile = new UserProfile({ userId });
    }

    // Update profile fields
    userProfile.bio = bio;
    userProfile.projects = projects;
    userProfile.skills = skills;
    userProfile.experiences = experiences;
    userProfile.education = education;

    // Handle profile picture upload
    if (req.file) {
      const { originalname, buffer, mimetype } = req.file;

      userProfile.profilePicture.data = buffer;
      userProfile.profilePicture.contentType = mimetype;
    }

    await userProfile.save();
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Error updating user profile" });
  }
};

const updateUserProfilePicture = async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: 'File upload failed' });
      }

      // Proceed with updating the profile picture
      const file = req.file; // Access uploaded file details

      // Your logic to update the profile picture
      // Example: const { buffer, mimetype } = file;

      res.status(200).json({ message: 'Profile picture updated successfully' });
    });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBio = async (req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;

  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: { bio } },
      { new: true }
    );

    res.status(200).json({ message: 'Bio updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating bio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProjects = async (req, res) => {
  const { userId } = req.params;
  const { projects } = req.body;

  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: { projects } },
      { new: true }
    );

    res.status(200).json({ message: 'Projects updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateSkills = async (req, res) => {
  const { userId } = req.params;
  const { skills } = req.body;

  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: { skills } },
      { new: true }
    );

    res.status(200).json({ message: 'Skills updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateExperiences = async (req, res) => {
  const { userId } = req.params;
  const { experiences } = req.body;

  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: { experiences } },
      { new: true }
    );

    res.status(200).json({ message: 'Experiences updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating experiences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateEducation = async (req, res) => {
  const { userId } = req.params;
  const { education } = req.body;

  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId },
      { $set: { education } },
      { new: true }
    );

    res.status(200).json({ message: 'Education updated successfully', userProfile });
  } catch (error) {
    console.error('Error updating education:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// const getCurrentUser = async (req, res) => {
//   try {
//     // Assuming you've set up authentication and have access to the user's ID
//     const userId = req.userId; // Fetch the user ID from the authentication middleware

//     // Fetch the user details based on the userId
//     const currentUser = await User.findOne({ userId });

//     if (!currentUser) {
//       console.log('user noooooo found ');
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Send back the user data as a response
//     res.status(200).json({ currentUser });
//   } catch (error) {
//     console.error('Error fetching current user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Fetch the user ID from the route parameters

    // Fetch the user details based on the userId
    const currentUser = await User.findOne({ userId });

    if (!currentUser) {
      console.log('User nottttt found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Send back the user data as a response
    res.status(200).json({ currentUser });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export default {
  registerUser,
  loginUser,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  updateUserProfilePicture,
  updateBio,
  updateProjects,
  updateSkills,
  updateExperiences,
  updateEducation,
  getCurrentUser
};