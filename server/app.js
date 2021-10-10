const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 9000;

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/MarielaCushions";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("connected to db!")
);

const cors = require("cors");
app.use(cors());

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.listen(9000, () => {
  console.log("Server started");
});
