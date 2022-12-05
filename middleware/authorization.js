const jwt = require("jsonwebtoken");

const User = require("../model/user_model");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("toke>>>>>>>>>" + token);

  const obj = jwt.verify(token, "secretkey");
  const { userId } = obj;
  console.log(userId);
  console.log(obj);
  User.findByPk(userId)
    .then((user) => {
      console.log("final=======", user.id);
      req.user = user;
      console.log("this is >>>>>>>>>>", req.user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
