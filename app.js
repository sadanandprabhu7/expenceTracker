// step 1
const express = require("express");
const Razorpay = require("razorpay");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");

const https = require("https");
// const privateKey = fs.readFileSync("server.key");
// const certificate = fs.readFileSync("server.cert");
// step 2
const app = express();

const Expence = require("./model/expenceMain");
const Urls = require("./model/url");
const routesAdmin = require("./routes/user");
const sequelize = require("./util/database");

const Forgotpassword = require("./model/forgotpassword");
const resetPasswordRoutes = require("./routes/resetpassword");

const leaderShipRoutes = require("./routes/leadership");

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user");
const purchaseRoutes = require("./routes/purchase");
const Order = require("./model/orders");

// step 3
const cors = require("cors");

// step 4
const bodyParser = require("body-parser");
const User = require("./model/user_model");
const path = require("path");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
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

User.hasMany(Urls);
sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    //console.log(result);
    // https
    //   .createServer({ key: privateKey, cert: certificate }, app)
    //   .listen(process.env.PORT);
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
