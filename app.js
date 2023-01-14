const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

dotenv.config();
const app = express();

const resetPasswordRoutes = require("./routes/resetpassword");
const leaderShipRoutes = require("./routes/leaderboard");
const userRoutes = require("./routes/user");
const purchaseRoutes = require("./routes/purchase");

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);
app.use("/user", userRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/password", resetPasswordRoutes);
app.use(leaderShipRoutes);

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
