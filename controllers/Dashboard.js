const Transaction = require("../models/Transaction");
const dayjs = require("dayjs");

exports.getDashboardData = async (req, res) => {
  const { period } = req.query; // week | month | year

  let startDate;
  if (period === "week") startDate = dayjs().startOf("week");
  if (period === "month") startDate = dayjs().startOf("month");
  if (period === "year") startDate = dayjs().startOf("year");

  const transactions = await Transaction.find({
    createdAt: { $gte: startDate.toDate() }
  });

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  res.json({
    income,
    expense,
    balance: income - expense,
    transactions
  });
};
