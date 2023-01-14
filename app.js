// step 1
const mongoose = require("mongoose");
const express = require("express");
const Razorpay = require("razorpay");

const app = express();

// const routesAdmin = require("./routes/user");

// const Forgotpassword = require("./model/forgotpassword");
// const resetPasswordRoutes = require("./routes/resetpassword");

// const leaderShipRoutes = require("./routes/leadership");

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const purchaseRoutes = require("./routes/purchase");
// const Order = require("./model/orders");
const bodyParser = require("body-parser");
// const User = require("./model/user_model");
// const path = require("path");

// step 3
const cors = require("cors");

// step 4

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   { flags: "a" }
// );
app.use(cors());
//app.use(helmet());
//app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);
app.use("/user", userRoutes);

app.use("/purchase", purchaseRoutes);

// // step 5

// app.use("/password", resetPasswordRoutes);

// app.use(routesAdmin);
// app.use(leaderShipRoutes);
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `public/${req.url}`));
// });
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@expensetracker.ccmowgf.mongodb.net/expenseTracker?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(process.env.PORT);
  });
