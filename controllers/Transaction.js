const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const dayjs = require("dayjs");

exports.createTransaction = async (req, res) => {
  try {
    const tx = await Transaction.create(req.body);

    // Update account balance
    if (tx.type === "income") {
      await Account.updateOne(
        { name: tx.account },
        { $inc: { balance: tx.amount } }
      );
    }

    if (tx.type === "expense") {
      await Account.updateOne(
        { name: tx.account },
        { $inc: { balance: -tx.amount } }
      );
    }

    if (tx.type === "transfer") {
      await Account.updateOne(
        { name: tx.fromAccount },
        { $inc: { balance: -tx.amount } }
      );
      await Account.updateOne(
        { name: tx.toAccount },
        { $inc: { balance: tx.amount } }
      );
    }

    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  res.json(transactions);
};

exports.updateTransaction = async (req, res) => {
  const tx = await Transaction.findById(req.params.id);

  const hours = dayjs().diff(dayjs(tx.createdAt), "hour");
  if (hours > 12) {
    return res.status(403).json({ message: "Edit restricted after 12 hours" });
  }

  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};
