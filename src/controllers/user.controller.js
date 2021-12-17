const express = require("express");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const sendMail = require("../utils/send-mail");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const item = await User.create(req.body);
        const admins = await Admin.find({}, {email: 1, _id: 0}).lean().exec();
        const adminsEmail = admins.map(({email}) => email);
        // console.log(admisEmail);
        sendMail("master@abc.system", req.body.email, `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`, `Hi ${req.body.first_name}, Please confirm your email address`, `<p>Hi </p>${req.body.first_name}, <p>Please confirm your email address</p>`);

        adminsEmail.forEach((email) => {
            sendMail("master@abc.system", email, `${req.body.first_name} ${req.body.last_name} has registered with us`, `Please welcome ${req.body.first_name} ${req.body.last_name}`, `<p>Please welcome ${req.body.first_name} ${req.body.last_name},</p>`);
        })

        return res.status(201).send({item});
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to create user"});
    }
});

router.get("/", async (req, res) => {
    try {
        const page = + req.query.page || 1;
        const size = + req.query.size || 4;
        const skip = (page - 1) * size;
        const totalPages = Math.ceil((await User.find().countDocuments().lean().exec()) / size);
        const item = await User.find().skip(skip).limit(size).lean().exec();
        return res.status(201).send({item, totalPages});
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to load user"});
    }
});

module.exports = router;