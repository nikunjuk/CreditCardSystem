var mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    cardLimit: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
