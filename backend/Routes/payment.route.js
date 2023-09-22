const express = require("express");
const stripe = require("stripe")(
  "sk_test_51MlUUDSAOrQB6xwRyJ88BuXaTUwIMBkqfDVu8cS2IeDzuI5CB87dewbTLrrV52MbZ1PHUfa1J042lsFDAIXv9phR00x1nofbVb"
);
const uuid = require("uuid").v4;
const router = express.Router();
const User = require("../Models/user.model.js");

router.use(express.static("public"));

router.post("/payment", async (req, res) => {
  try {
    if (!req.body.token || !req.body.total) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const { token, total } = req.body;

    const idempotencyKey = uuid();

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.paymentIntents.create(
      {
        amount: total * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
        description: `₹ ${total}/-`,
        shipping: {
          name: token.card.name,
          address: {
            country: token.card.address_country,
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

    // Create the payment details object
    const paymentDetails = {
      amount: total,
      currency: "INR",
      chargeId: charge.id,
    };

    // Update the member's paymentDetails array
    member.paymentDetails.push(paymentDetails);
    await member.save();

    res.status(200).json({ charge, member });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Make sure to set your Stripe secret key in your environment variables
// const User = require("../models/user.model"); // Adjust the path to your user model as needed

// // Route to handle payment processing
// router.post("/process-payment", async (req, res) => {
//   try {
//     const { userId, amount, currency } = req.body;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Create a payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: currency,
//       customer: user.stripeCustomerId, // You should have a field in your user model to store the Stripe customer ID
//     });

//     // Send the client secret to the frontend to complete the payment
//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Payment processing error:", error);
//     res.status(500).json({ error: "Payment processing error" });
//   }
// });

// module.exports = router;
