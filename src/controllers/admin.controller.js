const express = require("express");
const Admin = require("../models/admin.model");
const sendMail = require("../utils/send-mail");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const item = await Admin.create(req.body);
        sendMail("vsrathod39@gmail.com", req.body.email, `Welcome to ABC system as admin ${req.body.first_name} ${req.body.last_name}`, `Hi ${req.body.first_name}, Please confirm your email address`, `<p>Hi </p>${req.body.first_name}, <p>Please confirm your email address</p>`);
        return res.status(201).send({item});
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to create admin"});
    }
});

router.get("/", async (req, res) => {
    try {
        const item = await Admin.find().lean().exec();
        return res.status(201).send({item});
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to admin user"});
    }
});

module.exports = router;