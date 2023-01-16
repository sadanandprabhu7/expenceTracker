const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expense: {
    expenses: [
      {
        expense: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
  },
  orders: [
    {
      paymentid: {
        type: String,
        required: true,
      },
      orderid: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
  url: [
    {
      urls: {
        type: String,
        required: true,
      },
    },
  ],
  ispremiumuser: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.deleteExpense = function (expenseId) {
  const updatedExpense = this.expense.expenses.filter((expense) => {
    return expense._id.toString() !== expenseId.toString();
  });

  this.expense.expenses = updatedExpense;
  return this.save();
};
module.exports = mongoose.model("User", userSchema);
