const jwt = require("jsonwebtoken");

const User = require("../model/user_model");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const obj = jwt.verify(token, "secretkey");
    const { userId } = obj;

    const user = await User.findByPk(userId);
    req.user = user;
    next();
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};
