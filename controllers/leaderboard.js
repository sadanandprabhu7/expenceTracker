const User = require("../model/user");

//finnd that is user is preminum or not if he will be then i'll show the leadership with all details to this account
exports.ispre = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    res.status(200).json({ data: user.ispremiumuser });
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};

// getting all user to show their names in leadership
exports.leaderShip = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $project: {
          Total: { $sum: "$expense.expenses.expense" },
          name: "$name",
        },
      },
    ]);
    res.status(200).json({ data: data });
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};

// getting all expence of particula user by id pass in url
exports.details = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const data = await user.populate("expense.expenses");
    res.status(200).json({ data: data.expense.expenses });
  } catch (err) {
    res.json({ msg: "somthing went wrong" });
  }
};
