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
        description: `Membership of ₹ ${total}/-`,
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