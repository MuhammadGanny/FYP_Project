import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true, unique: true },
    companyName: String,
    email: String,
    password: String,
    phone: String,
    companyAddress: String,
    // Other relevant fields for company details
  },
  { versionKey: false }
);

const companyProfileSchema = new mongoose.Schema({
  companyId: { type: String, required: true, unique: true },
  description: String,
  products: [String],
  services: [String],
  // Other fields related to the company profile
});

const Company = mongoose.model("Company", companySchema);
const CompanyProfile = mongoose.model("CompanyProfile", companyProfileSchema);

export { Company, CompanyProfile };
