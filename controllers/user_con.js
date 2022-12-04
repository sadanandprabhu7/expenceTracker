const User = require("../model/user_model");

exports.signUp = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const data = await User.create({
    name: name,
    email: email,
    password: password,
  });
  res.status(200).json({ msg: "successfully registered" });
};
