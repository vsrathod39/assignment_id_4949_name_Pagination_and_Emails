const express = require("express");
const connect = require("./config/db");

const productController = require("./controllers/product.controller");
const userController = require("./controllers/user.controller");
const adminController = require("./controllers/admin.controller");

const app = express();
app.use(express.json());

app.use("/product", productController);
app.use("/user", userController);
app.use("/admin", adminController);

app.listen(2345, async () => {
    await connect();
    console.log("Listening at port 2345...");
});