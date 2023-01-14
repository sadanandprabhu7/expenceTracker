const Razorpay = require("razorpay");

const env = require("dotenv");
env.config();

const purchasepremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;

    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      if (err) {
        throw new Error(err);
      }
      await req.user.updateOne({
        orders: [{ orderid: order.id, status: "PENDING" }],
      });
      return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Sometghing went wrong", error: err });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    await req.user.updateOne({
      orders: [
        { orderid: order_id, paymentid: payment_id, status: "SUCCESSFUL" },
      ],
    });
    await req.user.updateOne({ ispremiumuser: true });
    return res
      .status(202)
      .json({ sucess: true, message: "Transaction Successful" });
  } catch (err) {
    res.status(403).json({ errpr: err, message: "Sometghing went wrong" });
  }
};

module.exports = {
  purchasepremium,
  updateTransactionStatus,
};
