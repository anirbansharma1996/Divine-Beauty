const express = require('express');
const dotenv = require('dotenv')
const cors = require("cors")
const userRoute = require('./Routes/user.route.js'); 
const cartRoute = require('./Routes/cart.route.js')
const productRoute = require('./Routes/product.route.js')
const paymentRoute = require('./Routes/payment.route.js')
const { default: mongoose } = require('mongoose');
//::::::::::::::::::::::::::::::::::::::::::::::::
const app = express();
dotenv.config()
//::::::::::::::::::::::::::::::::::::::::::::::::
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//::::::::::::::::: Use the routes :::::::::::::::::
app.use('/v1', userRoute);
app.use('/v1', cartRoute);
app.use('/v1', productRoute);
app.use('/v1', paymentRoute);
//:::::::::: connection with the MongoDB :::::::::::
const Connect = async()=>{
 try {
    await mongoose.connect(process.env.MONGODB)
    console.log('connected with Backend Template on MongoDB')
 } catch (error) {
    console.log({"error": error.message})
 }
}

//::::::::::::::: Start the server ::::::::::::::::
app.listen(process.env.PORT, () => {
    Connect()
  console.log(`Server is running on port ${process.env.PORT}`);
});
