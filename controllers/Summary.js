const Transaction = require('../models/Transaction')

exports.getCategorySummary = async (req, res) => {
  const { from, to, division } = req.query;

  const match = {
    type: "expense",
    createdAt: {
      $gte: new Date(from),
      $lte: new Date(to)
    }
  };

  if (division) match.division = division;

  const summary = await Transaction.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(summary);
};
