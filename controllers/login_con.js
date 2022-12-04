const User = require("../model/user_model");

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findAll({ where: { email: email, password: password } })
    .then((result) => {
      res.status(200).json({ msg: "sucessfull login" });
    })
    .catch((err) => {
      res.status(400).json({ err: "User does not exists" });
    });
};
