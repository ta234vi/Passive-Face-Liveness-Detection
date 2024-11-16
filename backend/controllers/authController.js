const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const upload = require('../config/multerconfig');
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;
// const { uploadImageToCloudinary } = require('../utils/imageUploader');
// require("dotenv").config();
// Create a transporter for sending OTPs
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate and send OTP
exports.generateOTP = async (req, res) => {
    const { aadhar } = req.body;
  
    try {
      const user = await User.findOne({ aadhar });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpiry = Date.now() + 10 * 60 * 1000;
  
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      await transporter.sendMail({
        to: user.email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
      });
  
      res.status(200).json({ msg: 'OTP sent successfully' });
    } catch (err) {
      console.error("Error in generateOTP:", err); // Enhanced logging
      res.status(500).json({ msg: 'Server error. Please try again later.' });
    }
  };
  

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { aadhar, otp } = req.body;

  try {
    // Find user by Aadhar number
    const user = await User.findOne({ aadhar });

    // Check if the user exists, if OTP matches, and if OTP has not expired
    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Clear OTP and expiry fields after successful verification
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({ msg: 'OTP verified successfully' ,image: user.image, role: user.role});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
};
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'your_folder_name', // Specify the folder name
//       allowed_formats: ['jpg', 'png', 'jpeg'],
//       transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional transformation
//     },
//   });
//   cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
//   });
// const upload = multer({ storage: storage });
// exports.uploader = (req, res) => {
    
// };
exports.createUser = async (req, res) => {
  try {
      const { firstname, lastname, email, aadhar, address, phoneNo, gender, dob, image } = req.body;
      
      console.log('Received user data:', req.body);

      // Check if user already exists with the given email, aadhar, or phoneNo
      const existingUser = await User.findOne({
          $or: [
              { email },
              { aadhar },
              { phoneNo }
          ]
      });

      if (existingUser) {
          return res.status(400).json({
              message: "User with this email, Aadhar, or phone number already exists."
          });
      }

      // Validate image URL
      if (!image) {
          return res.status(400).json({
              success: false,
              message: "No image URL provided"
          });
      }

      // Create a new user with the image URL
      const newUser = new User({
          firstname,
          lastname,
          email,
          aadhar,
          image,
          address,
          phoneNo,
          gender,
          dob
      });

      // Save the user to the database
      await newUser.save();

      // Send a success response
      res.status(200).json({
         message: "User created successfully!" ,
        });
  } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
  }
};