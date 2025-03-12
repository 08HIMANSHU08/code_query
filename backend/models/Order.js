const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: [{ type: String, required: true }],
  orderItems: [
    {
      service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: 'Pending' },
  orderStatus: { type: String, default: 'Created' },
});

module.exports = mongoose.model('Order', orderSchema);
