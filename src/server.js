const express = require("express");
const connect = require("./config/db");

const productController = require("./controllers/product.controller");

const app = express();
app.use(express.json());

app.use("/product", productController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening at port 2345...");
});