const express = require("express");
const paymentModel = require("../models/paymentModel.js");
const orderModel = require("../models/orderModel.js");
const { v4: uuidv4 } = require("uuid");

const paymentRouter = express.Router();


// Dummy Payment Processing Route
paymentRouter.post("/payment", async (req, res) => {
    try {
        console.log("Received Payment Body:", req.body);
        console.log(req.body)

        const { cardNumber, expiry, cvv, amount, orderId } = req.body;

        if (!orderId) {
            console.log("Validation Error: Missing orderId");
            return res.status(400).json({ message: "Order ID is required!" });
        }

        // Basic validation
        if (!cardNumber || !expiry || !cvv || !amount || !orderId) {
            console.log("Validation Error: One or more fields missing", {
                cardNumber, expiry, cvv, amount, orderId
            });
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (cardNumber.length !== 16 || expiry.length !== 5 || cvv.length !== 3) {
            return res.status(400).json({ message: "Invalid card details!" });
        }

        // Generate a fake transaction ID
        const transactionId = uuidv4();

        // Save only necessary details in the payment model
        const newPayment = new paymentModel({
            amount,
            status: "Success",
            transactionId
        });

        await newPayment.save();

        // Find the order and update its payment status to 'success'
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId, 
            { paymentStatus: "success" }, 
            { new: true } // This returns the updated document
        );

        if (!updatedOrder) {
            return res.status(400).json({ message: "Order not found!" });
        }

        res.json({ 
            success: true, 
            message: "Payment Successful!", 
            transactionId,
            orderId: updatedOrder._id
        });
    } catch (error) {
        console.error("Payment Processing Error:", error);
        res.status(500).json({ success: false, message: "Server Error. Please try again later." });
    }
});

module.exports = paymentRouter;
