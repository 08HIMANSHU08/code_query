const axios = require("axios");
const crypto = require("crypto");


const initiatePayment =  async (req, res) => {
  const  merchantId = "PGTESTPAYUAT";
  const merchantKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  const host = "https://api-preprod.phonepe.com/apis/pg-sandbox";

  const { amount, order_id } = req.body;
  const transactionId = `T${Date.now()}`;
  const payload = {
    merchantId,
    transactionId,
    amount: amount * 100, 
    redirectUrl: "http://localhost:5000/api/payments/success",
    callbackUrl: "http://localhost:5000/api/payments/payment-webhook",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const payloadString = JSON.stringify(payload);
  const encodedPayload = Buffer.from(payloadString).toString("base64");

  const checksum = crypto
    .createHash("sha256")
    .update(encodedPayload + "/pg/v1/pay" + merchantKey)
    .digest("hex");

  try {
    const response = await axios.post(`${host}/pg/v1/pay`, {
      request: encodedPayload,
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": `${checksum}###1`,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const paymentUrl = response.data.data.instrumentResponse.redirectInfo.url;
    res.status(200).json({ paymentUrl });
  } catch (error) {
    console.error("Payment initiation failed:", error.response.data);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
}

const paymentWebhook= async (req, res) => {
  console.log("Payment Callback:", req.body);
  res.status(200).send("Payment Callback Received");
}

const paymentSuccess = async  (req, res) => {
  res.send("Payment Successful 🎉");
}

module.exports = {initiatePayment, paymentWebhook, paymentSuccess}