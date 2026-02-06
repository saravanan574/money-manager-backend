const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],  // matches frontend
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ["Fuel", "Movie", "Food", "Loan", "Medical", "Shopping", "Transport", "Other"],
      required: true
    },
    division: {
      type: String,
      enum: ["Personal", "Office"],
      required: true
    },
    account: {
      type: String,
      default: "Cash"
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    // Optional for future transfers
    fromAccount: String,
    toAccount: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
