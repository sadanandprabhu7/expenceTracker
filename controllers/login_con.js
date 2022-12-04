const User = require("../model/user_model");
const bcrypt = require("bcrypt");

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await User.findAll({ where: { email: email } });
    if (result) {
      bcrypt.compare(password, result[0].password, (err, newResult) => {
        if (err) {
          throw new Error("somthing went wrong");
        }
        if (newResult == true) {
          res.status(200).json({ success: true, msg: "sucessfull login" });
        } else {
          return res
            .status(400)
            .json({ success: false, msg: "wrong password" });
        }
      });
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "User does not exists" });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "User does not exists" });
  }
};