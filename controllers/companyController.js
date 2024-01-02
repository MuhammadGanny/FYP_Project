// controllers/companyController.js
import { Company, CompanyProfile } from '../models/companyModel';

const registerCompany = async (req, res) => {
  try {
    // Implement logic to register a new company based on incoming request data
    // For example:
    const { companyId, companyName, email, password, phone, address, industry } = req.body;
    const newCompany = new Company({
      companyId,
      companyName,
      email,
      password,
      phone,
      address,
      industry,
      // Other relevant fields
    });

    await newCompany.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    console.error('Error registering company:', error);
    res.status(500).json({ error: 'Error registering company' });
  }
};

const createCompanyProfile = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { description, products, services } = req.body;

    // Check if the company profile already exists
    let companyProfile = await CompanyProfile.findOne({ companyId });

    if (companyProfile) {
      return res.status(400).json({ error: 'Company profile already exists' });
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

    res.status(201).json({ message: 'Company profile created successfully', companyProfile });
  } catch (error) {
    console.error('Error creating company profile:', error);
    res.status(500).json({ error: 'Error creating company profile' });
  }
};

const getCompanyProfile = async (req, res) => {
  try {
    const { companyId } = req.params;

    const companyProfile = await CompanyProfile.findOne({ companyId });

    if (!companyProfile) {
      return res.status(404).json({ error: 'Company profile not found' });
    }

    res.status(200).json({ companyProfile });
  } catch (error) {
    console.error('Error fetching company profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCompanyProfile = async (req, res) => {
  try {
    const { companyId } = req.params;
    // Implement logic to update the company profile based on incoming request data
    // For example:
    const { description, products, services } = req.body;

    let companyProfile = await CompanyProfile.findOne({ companyId });

    if (!companyProfile) {
      companyProfile = new CompanyProfile({ companyId });
    }

    companyProfile.description = description;
    companyProfile.products = products;
    companyProfile.services = services;
    // Update other fields as needed

    await companyProfile.save();
    res.status(200).json({ message: 'Company profile updated successfully' });
  } catch (error) {
    console.error('Error updating company profile:', error);
    res.status(500).json({ error: 'Error updating company profile' });
  }
};

export default {
  registerCompany,
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
};
