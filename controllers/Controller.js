import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserData.js";
import StudentProfile from "../models/StudentProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import { v4 as uuidv4 } from "uuid";
//import  mongoose  from 'mongoose';

// const register = async (req, res) => {
//     try {
//       const { email, password } = req.body;

//       // Check if the email is already registered
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Email is already registered.' });
//       }

//       // Generate a unique userID
//       const userID = uuidv4();

//       // Create a new user with the generated userID
//       const newUser = new User({ email, password, userID });
//       await newUser.save();

//       // Return the generated userID to the client
//       res.status(201).json({ userID });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error.' });
//     }
//   };
const register = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password, generated userID, and userType
    const newUser = new User({ email, password: hashedPassword, userType });
    // const newUser = new UserData({
    //   email,
    //   password,
    //   userType,
    //   //Cprofile: null,
    //   //Sprofile: null,
    // });
    await newUser.save();

    // Return the generated userID and userType to the client
    res.status(201).json({ userId: newUser._id, userType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials.' });
//     }

//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid credentials.' });
//     }
//     const expiresIn = 3600;
//     // Generate JWT token
//     //const ObjectId = mongoose.Types.ObjectId;
//     //const token = jwt.sign({ userId: new ObjectId(user.userID), userType: user.userType }, 'your_secret_key');
//     const token = jwt.sign({ userId: user.userID, userType: user.userType }, 'your_secret_key' , { expiresIn });

//     // Return the token
//     res.json({ userId: user.userID, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error.' });
//   }
// };
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const expiresIn = 3600;

    // Generate JWT token
    const payload = {
      userId: user._id, // Assuming MongoDB ObjectId is used for user ID
      userType: user.userType,
    };

    const token = jwt.sign(payload, "your_secret_key", { expiresIn });

    //const token = jwt.sign({ userId: user.userID, userType: user.userType }, 'your_secret_key', { expiresIn });

    // Return the token
    res.json({ userId: user._id, userType: user.userType, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateUserType = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    // Update the user with the provided userType
    //   await User.updateOne({ _id: userId }, { userType });
    await User.updateOne({ userID: userId }, { userType });
    console.log("Received userType:", userType);
    // Create the corresponding profile based on userType
    if (userType === "student") {
      const newStudentProfile = new StudentProfile({ userId });
      await newStudentProfile.save();
    } else if (userType === "company") {
      const newCompanyProfile = new CompanyProfile({ userId });
      await newCompanyProfile.save();
    } else {
      return res.status(400).json({ error: "Invalid user type33." });
    }

    res.json({ message: "User type and profile setup successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default { register, login, updateUserType };
