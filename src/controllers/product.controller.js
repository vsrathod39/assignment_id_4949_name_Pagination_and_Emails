const express = require("express");
const Product = require("../models/product.model");
const sendMail = require("../utils/send-mail");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const item = await Product.create(req.body);
        sendMail("vsrathod39@outlook.com", "vsrathod39@gmail.com", `${req.body.name} is sucessfully created`, `Successfuly set price = ${req.body.price}`, `<h2>Successfuly set price = </h2> ${req.body.price}`)
        return res.status(201).send(item);
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed"});
    }
});

router.get("/", async (req, res) => {
    try {
        const page = + req.query.page || 1;
        const size = + req.query.size || 2;
        const skip = (page - 1) * size;
        const totalPages = Math.ceil((await Product.find().countDocuments().lean().exec()) / size);
        const item = await Product.find().skip(skip).limit(size).lean().exec();
        return res.status(201).send({item, totalPages});
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed"});
    }
});

module.exports = router;