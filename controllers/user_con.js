const User = require("../model/user_model");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await User.findAll({ where: { email: email } });

    if (result.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const salt = 10;
      bcrypt.hash(password, salt, async (err, hash) => {
        await User.create({
          name,
          email,
          password: hash,
        });
        res.status(200).json({ msg: "successfully registered" });
      });
    }
  } catch (err) {
    console.log(err);
  }
};
