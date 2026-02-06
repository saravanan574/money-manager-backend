require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/transactions", require("./routes/Transaction"));
app.use("/api/dashboard", require("./routes/Dashboard"));
app.use("/api/accounts", require("./routes/Account"));

app.listen(5000, () => {
  console.log("Backend running on port 5000 only");
});
