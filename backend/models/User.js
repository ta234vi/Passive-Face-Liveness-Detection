const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname:{ type:String, required:true},
  lastname:{ type:String, required:true},
  aadhar: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  otp: { type: String }, // Optional field for OTP
  otpExpiry: { type: Date }, // Optional field for OTP expiry
  role: {
    type: String, // Specify the type
    enum: ["Admin", "User"],
    default: "User",
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
