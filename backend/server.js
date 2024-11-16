const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./config/cloudinary');
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true}));

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
// Cloudinary configuration
// cloudinary.cloudinaryConnect();

// app.use('/tfjs_model', express.static(path.join(__dirname, 'public/tfjs_model'), {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.json')) {
//         res.setHeader('Content-Type', 'application/json');
//       }
//     }
//   }));
// app.get('/tfjs_model/*', (req, res) => {
//     console.log(`Request for: ${req.url}`);
//   });
app.use('/images/uploads', express.static(path.join(__dirname, 'public/images/uploads')));
// Route middleware
app.use('/api/auth', authRoutes); // Pass upload as a middleware to routes

// Debugging middleware
// app.use((req, res, next) => {
//     console.log(`Received request for ${req.method} ${req.url}`);
//     next();
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
