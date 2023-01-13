const User = require("../model/user");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await User.findOne({ email: email });
    if (result !== null) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const salt = 10;
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = new User({ name: name, email: email, password: hash });
        user.save();
        res.status(200).json({ msg: "successfully registered" });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const jwt = require("jsonwebtoken");

function generateToken(id) {
  return jwt.sign({ userId: id }, "secretkey");
}

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ email: email });
    if (result) {
      bcrypt.compare(password, result.password, (err, newResult) => {
        if (err) {
          throw new Error("somthing went wrong");
        }
        if (newResult == true) {
          res.status(200).json({
            success: true,
            msg: "sucessfull login",
            token: generateToken(result._id),
          });
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
