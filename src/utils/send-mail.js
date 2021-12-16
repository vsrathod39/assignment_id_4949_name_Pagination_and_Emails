const transporter = require("../config/mail");

module.exports = (from, to, subject, text, html) => {
    const message = {
        from,//: "vsrathod39@outlook.com",
        to,//: "vsrathod39@gmail.com",
        subject,//: `${req.body.name} is sucessfully created`,
        text,//: `Successfuly set price = ${req.body.price}`,
        html//: `<h2>Successfuly set price = </h2> ${req.body.price}` 
      };
    
    transporter.sendMail(message);
}