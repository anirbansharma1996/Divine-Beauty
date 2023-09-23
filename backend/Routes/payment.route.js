const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid").v4;
const router = express.Router();
const User = require("../Models/user.model.js");
const authMiddleware = require("../Middleware/auth.middleware.js");

router.use(express.static("public"));

router.post("/payment",authMiddleware, async (req, res) => {
 console.log(req.body)
  try {
    if (!req.body.token || !req.body.total) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const { token, total , items } = req.body;

    const idempotencyKey = uuid();

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.UserId,
    });

    const charge = await stripe.paymentIntents.create(
      {
        amount: total ,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
        description: `₹ ${Math.ceil(total)}/-`,
        shipping: {
          name: token.name,
          address: {
            country: token.address,
          },
        },
      },
      { idempotencyKey }
    );

    const memberEmail = token.email; // Assuming member email is provided in the token or request
    const member = await User.findOne({ email: memberEmail });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const paymentDetails = {
      amount: Math.ceil(total),
      currency: "INR",
      chargeId: charge.id,
      cart:items,
    };

    member.paymentDetails.push(paymentDetails);
    member.cart = [];
    await member.save();
    res.status(200).json({ charge, member });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


