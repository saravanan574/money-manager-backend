require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors({ origin:process.env.FRONTEND_URL
}));
app.use(express.json());

app.use("/api/transactions", require("./routes/Transaction"));
app.use("/api/dashboard", require("./routes/Dashboard"));
app.use("/api/accounts", require("./routes/Account"));

app.listen(process.env.PORT, () => {
  console.log("Backend running on port 5000 only");
});
