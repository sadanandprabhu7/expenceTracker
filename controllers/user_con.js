const User = require("../model/user_model");

exports.signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  // const name = req.body.name;
  // const email = req.body.email;
  // const password = req.body.password;
  User.findAll({ where: { email: email } }).then((result) => {
    if (result.length == 0) {
      User.create({
        name,
        email,
        password,
      }).then(() => {
        res.status(200).json({ msg: "successfully registered" });
      });
    } else {
      return res.json({ msg: "User already exists" });
    }
  });
};
