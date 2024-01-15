import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema({
 
  companyName: String,
  description: String,
  products: [String],
  services: [String],
  profilePicture: String,
});

const CompanyProfileData = mongoose.model('CompanyProfileData', companyProfileSchema);

export default CompanyProfileData;
