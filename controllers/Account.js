const Account = require("../models/Account");

exports.createAccount = async (req, res) => {
  const acc = await Account.create(req.body);
  res.status(201).json(acc);
};

exports.getAccounts = async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
};
