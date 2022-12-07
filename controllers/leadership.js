const sequelize = require("sequelize");
const Expence = require("../model/expenceMain");
const User = require("../model/user_model");

exports.ispre = (req, res) => {
  const id = req.user.id;

  User.findByPk(id).then((user) => {
    res.status(200).json({ data: user.ispremiumuser });
  });
};

exports.leaderShip = (req, res) => {
  const currId = req.user.id;
  User.findAll({
    where: { id: { [sequelize.Op.not]: currId } },
  }).then((users) => {
    res.status(200).json({ data: users });
  });
};

exports.details = (req, res) => {
  const userId = req.params.id;
  Expence.findAll({
    where: { userId: userId },
  }).then((result) => {
    res.status(200).json({ data: result });
  });
};
