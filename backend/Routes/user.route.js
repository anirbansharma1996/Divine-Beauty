const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.model.js"); // Path to your User model file
const authMiddleware = require("../Middleware/auth.middleware.js");

const router = express.Router();
// Multer storage configuration
const storage = multer.diskStorage({
  destination: "./uploads/", // Specify the directory to which the file will be saved
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

// Multer file filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};
// Multer upload instance
const upload = multer({ storage, fileFilter });

router.post("/signup", upload.single("image"), async (req, res) => {

  try {
    const { name, email, address, mobileNumber,gender, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new User({
      name,
      email,
      address,
      mobileNumber,
      gender,
      image: gender === "male"
        ? "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg"
        : "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-symbol-collection-avatar-image-stock-symbol-web-isolated-object-avatar-137159059.jpg",
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        mobileNumber: user.mobileNumber,
        image: user.image,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "28d",
      }
    );
    const { password: omitPassword, ...userDetails } = user.toObject();

    res
      .status(200)
      .json({ message: "Login successful", token, user: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user details
router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch the user details from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare the response data
    const userData = {
      name: user.name,
      email: user.email,
      address: user.address,
      mobileNumber: user.mobileNumber,
      image: user.image,
      cart: user.cart,
      paymentHistory: user.paymentDetails,
    };

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
