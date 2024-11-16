const express = require('express');
const { verifyOTP, generateOTP, createUser } = require('../controllers/authController');
const upload = require('../config/multerconfig');
const router = express.Router();
// router.use(fileUpload());
// router.post('/register', registerUser);
const nodemailer=require('nodemailer')
router.post('/verifyOtp', verifyOTP);
router.post('/generateOtp', generateOTP);
router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        console.log("bb")
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    try {
      const imageUrl = req.file.path;
      console.log('Uploaded file path:', imageUrl);
      
      res.json({
        message: 'Image uploaded successfully',
        url: imageUrl,
      });
    } catch (error) {
      console.error('Error processing uploaded image:', error);
      res.status(500).json({ message: 'Image processing failed', error: error.message });
    }
});
router.post('/users', createUser);
router.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
  
    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'saksham3112853@gmail.com',
        pass: 'llvvmvzxxrucqtyt',
      },
    });
  
    const mailOptions = {
      from: email,
      to: 'saksham3112853@gmail.com',
      subject: `New message from ${name}`,
      text: message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });
  
module.exports = router;