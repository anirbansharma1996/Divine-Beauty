const express = require("express");
const Product = require("../Models/product.model.js");
const multer = require("multer");
const path = require("path");

//::::::::::::::::::::::::::::::::::::::
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
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

// Create a new product
//  upload.single("image"),
router.post("/products",async (req, res) => {
  try {
    const {image,offer, title, desc, price,original,rating } = req.body;

    const newProduct = new Product({
      //image: req.file.filename,
      image,
      offer,
      title,
      desc,
      price,
      original,
      rating
    });
    const savedProduct = await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//::::::::::::::::: Get all products :::::::::::::::
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//::::::::::: Get a single product by ID ::::::::::::::::::
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//::::::::::::::::::::::: patch a product :::::::::::::::::
router.patch('/products/:id', async (req, res) => {
  try {
    const { name, price, image, quantity, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { name, price, image, quantity, description } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//:::::::::::::::::::: Update a product :::::::::::::::::::::::
router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, image, quantity, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, image, quantity, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//::::::::::::::::::: Delete a product ::::::::::::::::::::::::
router.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
