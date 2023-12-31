const express = require("express");
const User = require("../Models/user.model.js");
const authMiddleware = require ('../Middleware/auth.middleware.js')
//::::::::::::::::::::::::::::::::::::::

const router = express.Router();
//:::::::::::: Add item to cart ::::::::
router.post("/cart/add", authMiddleware, async (req, res) => {

  try {
    const productId= req.body._id
    const quantity  =  1;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingCartItem = user.cart.find((item) =>
      item.productId.equals(productId)
    );
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "message": error.message });
  }
});

//:::::::::::  Remove item from cart ::::::::::::::::
router.delete("/cart/remove/:id", authMiddleware, async (req, res) => {
  try {
    const productId= req.params.id
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (cartItemIndex !== -1) {
      user.cart.splice(cartItemIndex, 1);
      await user.save();
    }

    res.status(200).json({ message: "Item has been removed from cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//:::::::::::::::: Get user's cart :::::::::::::::::::
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//:::::::::::::::::::: Orders Route ::::::::::::::::::
router.get("/order-history",authMiddleware,async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orderHistory = user.orders;

    res.status(200).json({ orderHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
