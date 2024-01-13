// controllers/companyController.js
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { Company, CompanyProfile } from "../models/companyModel.js";

const registerCompany = async (req, res) => {
  try {
    const { companyName, email, password, phone, companyAddress } = req.body;
    const companyId = uuidv4(); // Generate UUID v4 for company ID

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      companyId,
      companyName,
      email,
      password: hashedPassword, // Store hashed password
      phone,
      companyAddress,
    });

    await newCompany.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ error: "Error registering company" });
  }
};

const loginCompany = async (req, res) => {
  console.log("Comes here");
  const { email, password } = req.body;

  const company = await Company.findOne({ email });
  console.log(company);
  if (!company) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, company.password);

  if (passwordMatch) {
    res.status(200).json({ message: "Company logged in successfully" });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
};

const createCompanyProfile = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { description, products, services } = req.body;

    // Check if the company profile already exists
    let companyProfile = await CompanyProfile.findOne({ companyId });

    if (companyProfile) {
      return res.status(400).json({ error: "Company profile already exists" });
    }

    // Create a new company profile
    companyProfile = new CompanyProfile({
      companyId,
      description,
      products,
      services,
      // Other fields related to the company profile
    });

    await companyProfile.save();

    res.status(201).json({
      message: "Company profile created successfully",
      companyProfile,
    });
  } catch (error) {
    console.error("Error creating company profile:", error);
    res.status(500).json({ error: "Error creating company profile" });
  }
};

const getCompanyProfile = async (req, res) => {
  try {
    const { companyId } = req.params;

    const companyProfile = await CompanyProfile.findOne({ companyId });

    if (!companyProfile) {
      return res.status(404).json({ error: "Company profile not found" });
    }

    res.status(200).json({ companyProfile });
  } catch (error) {
    console.error("Error fetching company profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCompanyDescription = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { description } = req.body;

    let companyProfile = await CompanyProfile.findOne({ companyId });

    if (!companyProfile) {
      companyProfile = new CompanyProfile({ companyId });
    }

    companyProfile.description = description;

    await companyProfile.save();
    res
      .status(200)
      .json({ message: "Company description updated successfully" });
  } catch (error) {
    console.error("Error updating company description:", error);
    res.status(500).json({ error: "Error updating company description" });
  }
};

const updateCompanyProducts = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { products } = req.body;

    let companyProfile = await CompanyProfile.findOne({ companyId });

    if (!companyProfile) {
      companyProfile = new CompanyProfile({ companyId });
    }

    companyProfile.products = products;

    await companyProfile.save();
    res.status(200).json({ message: "Company products updated successfully" });
  } catch (error) {
    console.error("Error updating company products:", error);
    res.status(500).json({ error: "Error updating company products" });
  }
};

const updateCompanyServices = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { services } = req.body;

    let companyProfile = await CompanyProfile.findOne({ companyId });

    if (!companyProfile) {
      companyProfile = new CompanyProfile({ companyId });
    }

    companyProfile.services = services;

    await companyProfile.save();
    res.status(200).json({ message: "Company services updated successfully" });
  } catch (error) {
    console.error("Error updating company services:", error);
    res.status(500).json({ error: "Error updating company services" });
  }
};

export default {
  registerCompany,
  loginCompany,
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyDescription,
  updateCompanyProducts,
  updateCompanyServices,
};
