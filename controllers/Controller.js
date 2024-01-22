import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserData.js";
import StudentProfile from "../models/StudentProfile.js";
import CompanyProfile from "../models/CompanyProfile.js";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, userType });

    await newUser.save();

    res.status(201).json({ userId: newUser._id, userType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const expiresIn = 3600;

    const payload = {
      userId: user._id,
      userType: user.userType,
    };

    const token = jwt.sign(payload, "your_secret_key", { expiresIn });

    res.json({ userId: user._id, userType: user.userType, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateUserType = async (req, res) => {
  try {
    const { userId, userType } = req.body;

    await User.updateOne({ userID: userId }, { userType });
    console.log("Received userType:", userType);

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
