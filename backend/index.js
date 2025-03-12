require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/test", (req, res) => {
    res.send("Hello");
  });
app.use('/api/services', serviceRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));