const Cart = require('../models/Cart');
const { v4: uuidv4 } = require("uuid")
const Order = require("../models/Order")


const addToCart = async (req, res) => {
    try {
      let { user_id, service_id, quantity } = req.body;

  
      let cart = await Cart.findOne({ user_id });
  
      if (cart) {
        const existingItem = cart.items.find((item) => item.service_id.equals(service_id));
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ service_id, quantity });
        }
      } else {
        cart = new Cart({ user_id, items: [{ service_id, quantity }] });
      }
  
      await cart.save();
      res.status(200).json({ success: true, message: "Service added to cart", cart });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error adding to cart", error });
    }
  };
  
const getUserCart = async (req, res) => {
    try {
      let { id } = req.params;
  
      const cart = await Cart.findOne({ user_id: id }).populate("items.service_id");
  
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }
  
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching cart", error });
    }
  };

const cartCheckout = async(req,res)=>{
    try {
        const { user_id } = req.body;
        const cart = await Cart.findOne({ user_id }).populate("items.service_id");
    
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Cart is empty!" });
        }
    
        let totalAmount = 0;
        const orderItems = cart.items.map((item) => {
          totalAmount += item.service_id.price * item.quantity;
          return {
            service_id: item.service_id._id,
            quantity: item.quantity,
          };
        });
    
        const order_id = uuidv4();
    
        const newOrder = new Order({
          user_id,
          order_id,
          orderItems: orderItems,
          totalAmount: totalAmount,
          paymentStatus: "Pending",
          orderStatus: 'Created' ,
        });
    
        await newOrder.save();
        await Cart.findOneAndUpdate({ user_id }, { items: [] });
    
        res.json({
          message: "Order placed successfully!",
          order_id,
          total_amount: totalAmount,
          items: orderItems,
        });
      } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

module.exports = {
    addToCart,
    getUserCart,
    cartCheckout
}
