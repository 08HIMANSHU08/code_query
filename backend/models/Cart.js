const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: 'Order',
    required: true
  },
  items: [
    {
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }
],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema);
