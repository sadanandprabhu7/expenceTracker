// step 1
const express = require("express");

// step 2
const expenceApp = express();

const Expence = require("./model/expenceMain");
const routesAdmin = require("./routes/router");
const sequelize = require("./util/database");

// step 3
const cors = require("cors");

// step 4
const bodyParser = require("body-parser");
const User = require("./model/user_model");

expenceApp.use(cors());

// step 5
expenceApp.use(bodyParser.json({ extended: false }));

expenceApp.use(routesAdmin);

User.hasMany(Expence);
Expence.belongsTo(User);
sequelize
  //.sync({ force: true })
  .sync()
  .then((result) => {
    //console.log(result);

    expenceApp.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
