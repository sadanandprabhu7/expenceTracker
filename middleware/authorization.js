const jwt = require("jsonwebtoken");

const User = require("../model/user_model");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  const obj = jwt.verify(token, "secretkey");
  const { userId } = obj;

  User.findByPk(userId)
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
