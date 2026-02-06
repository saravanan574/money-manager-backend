const router = require("express").Router();
const controller = require("../controllers/Transaction");

router.post("/", controller.createTransaction);
router.get("/", controller.getTransactions);
router.put("/:id", controller.updateTransaction);

module.exports = router;
