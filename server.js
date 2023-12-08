const express = require("express");

const dotenv = require("dotenv").config();
const errorhandler = require("./middilware/errorhandler");
const connectDb = require("./config/dbconnection");
connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/routescotact"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`server has started on ${PORT}`);
});
