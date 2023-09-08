const mongoose = require('mongoose');

const paymentDetailsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  chargeId: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  paymentDetails: [paymentDetailsSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
