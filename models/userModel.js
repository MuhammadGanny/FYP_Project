// const mongooose = require('mongoose');
// const{Schema,model} = mongooose

// const courseSchema = Schema({
//     courseid: Number,   
//     code: String,
//     title: String,
//     crhr: Number,
//     semester: Number
// });

// module.exports = model('Course', courseSchema)

// const mongoose = require('mongoose');
import  mongoose  from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  password: String,
  phone: String,
  university: String
});

const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, 
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userSchema' }, // Reference to the registration model
  bio: String,
  projects: [String],
  skills: [String],
  experiences: [{
    title: String,
    company: String,
    description: String,
    startDate: Date,
    endDate: Date,
  }],
  education: [String],
  profilePicture: {
    data: Buffer,
    contentType: String,
    // contentType: 'image/jpeg',
  },
});


const User = mongoose.model('User', userSchema);
const UserProfile = mongoose.model('UserProfile', userProfileSchema);


// module.exports = { User, UserProfile };
export {User, UserProfile };