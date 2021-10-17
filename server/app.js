const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 9000;

const mongoose = require("mongoose");
const url = "MONGODB_URL";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log("connected to db!")
);

const cors = require("cors");
app.use(cors());

const bannerRouter = require("./routes/banners");
app.use("/api/banner", bannerRouter);

const cartRouter = require("./routes/carts");
app.use("/api/cart", cartRouter);

const productRouter = require("./routes/products");
app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log("Server started");
});
