const { where } = require("sequelize");
const Expence = require("../model/expenceMain");
const User = require("../model/user_model");

exports.addDetails = async (req, res, next) => {
  const expence = req.body.expence;
  const description = req.body.description;
  const category = req.body.category;
  const data = await Expence.create({
    expence: expence,
    description: description,
    category: category,
    userId: req.user.id,
  });
  res.status(201).json({ newUserDetails: data });
};

exports.showDeails = (req, res) => {
  req.user
    .getExpences()
    //Expence.findAll({ where: { userId: req.user.id } })
    .then((data) => {
      res.json({
        newUserDetails: data,
        ispre: req.user.ispremiumuser,
        name: req.user.name,
      });
    });
};

exports.deleteDeails = (req, res, next) => {
  const prodId = req.params.id;
  Expence.findByPk(prodId)
    .then((user) => {
      return user.destroy({ where: { userId: req.user.id } });
    })
    .then(() => {
      console.log("product destroyed");
      res.status(200).json({ msg: "successfully deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
