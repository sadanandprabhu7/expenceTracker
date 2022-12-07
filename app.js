// step 1
const express = require("express");
const Razorpay = require("razorpay");
// step 2
const app = express();

const Expence = require("./model/expenceMain");
const routesAdmin = require("./routes/router");
const sequelize = require("./util/database");

const Forgotpassword = require("./model/forgotpassword");
const resetPasswordRoutes = require("./routes/resetpassword");

const leaderShipRoutes = require("./routes/leadership");

const dotenv = require("dotenv");

const userRoutes = require("./routes/router");
const purchaseRoutes = require("./routes/purchase");
const Order = require("./model/orders");

// step 3
const cors = require("cors");

// step 4
const bodyParser = require("body-parser");
const User = require("./model/user_model");

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user", userRoutes);

app.use("/purchase", purchaseRoutes);

// step 5

app.use("/password", resetPasswordRoutes);

app.use(routesAdmin);
app.use(leaderShipRoutes);

User.hasMany(Expence);
Expence.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    //console.log(result);

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
