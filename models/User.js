
// const mongoose = require('mongoose');

import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['student', 'company'], default: null },
  userID: { type: String, required: true, unique: true },
});

const UserData = mongoose.model('UserData', userSchema);

export default UserData;
