const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SchemaForgotpassword = new Schema({
  id: {
    type: String,
    required: true,
  },
  active: { type: Boolean },
  expiresby: { type: Date },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Forgotpassword ", SchemaForgotpassword);
