const router = require("express").Router();
const dashboard = require("../controllers/Dashboard");
const summary = require("../controllers/Summary");
router.get("/", dashboard.getDashboardData);
router.get("/category-summary", summary.getCategorySummary);

module.exports = router;
