const User = require("../model/user_model");

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await User.findAll({ where: { email: email } });
    if (result) {
      if (result[0].password === password) {
        res.status(200).json({ success: true, msg: "sucessfull login" });
      } else {
        return res.status(400).json({ success: false, msg: "wrong password" });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "User does not exists" });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "User does not exists" });
  }
};
