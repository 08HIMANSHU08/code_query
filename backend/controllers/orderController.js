const Order = require('../models/Order');

const createOrder = async (req, res) => {
    try {
        const { user_id, orderItems, totalAmount } = req.body;
        // console.log(orderItems,totalAmount)
        const items = orderItems.map((item) => ({
            service_id: item.service_id,
            quantity: item.quantity || 1,
          }));
          console.log(items)
        const order = new Order({ user_id, orderItems: items, totalAmount, paymentStatus: 'Pending', orderStatus: 'Created' });
        // console.log(order)
        const data = await order.save();
        console.log(data._id)
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderStatus = async (req, res) => {
    try {
        const { order_id } = req.params;
        const order = await Order.findOne({ orderId: order_id });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ orderStatus: order.orderStatus, paymentStatus: order.paymentStatus });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    createOrder,
    getOrderStatus
}