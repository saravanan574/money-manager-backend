const router = require("express").Router();
const controller = require("../controllers/Account");

router.post("/", controller.createAccount);
router.get("/", controller.getAccounts);

module.exports = router;
