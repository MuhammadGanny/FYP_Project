
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['student', 'company'], default: null },
  Sprofile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile', 
  },
  Cprofile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfileData', // Dynamic reference based on userType
  },
});

const UserData = mongoose.model('UserData', userSchema);

export default UserData;
