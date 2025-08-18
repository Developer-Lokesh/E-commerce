const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        quantity: { type: Number, required: true, min: 1 },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      },
    ],
    status: { type: String, default: "pending", enum: ["pending", "shipped", "delivered", "canceled"] },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["cash", "card", "UPI"] },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;