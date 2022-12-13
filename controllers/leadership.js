const sequelize = require("sequelize");
const Expence = require("../model/expenceMain");
const User = require("../model/user_model");

//finnd that is user is preminum or not if he will be then i'll show the leadership with all details to this account
exports.ispre = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findByPk(id);
    res.status(200).json({ data: user.ispremiumuser });
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};

// getting all user to show their names in leadership
exports.leaderShip = async (req, res) => {
  try {
    const currId = req.user.id;
    const users = await User.findAll({
      // where: { id: { [sequelize.Op.not]: currId } }, // all user axcept this user
    });
    //with total expences
    const totalAmount = await Expence.findAll({
      attributes: [
        "userId",
        [sequelize.fn("sum", sequelize.col("expence")), "total_amount"],
      ],
      //where: { userId: { [sequelize.Op.not]: currId } },
      group: ["userId"],
      raw: true,
    });

    res.status(200).json({ data: users, totalAmount });
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};

// getting all expence of particula user by id pass in url
exports.details = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Expence.findAll({
      where: { userId: userId },
    });

    res.status(200).json({ data: result });
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};
