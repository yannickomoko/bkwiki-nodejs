const jwt = require("jsonwebtoken");
const connection = require("../config/db");
const authUtils = require("../utils/auth");
const nodemailer = require('nodemailer');

module.exports.authenticate = function (req, res) {
  const phone = req.body.phone;
  const password = req.body.password;
  const passwordhash = authUtils.hashpassword(password);

  connection.query(
    "SELECT `phone`, `password` FROM users WHERE phone = ?",
    [phone],
    function (error, results) {
      if (!error) {
        if (results.length > 0) {
          if (
            phone === results[0].phone &&
            passwordhash === results[0].password
          ) {
            const token = jwt.sign(JSON.parse(JSON.stringify(results[0])), process.env.JWT_KEY, {
              expiresIn: 10000
            });
            res.json({
              status: true,
              token: token,
            });
          } else {
            res.json({
              status: false,
              message: "Incorrect phone number or password.",
            });
          }
        } else {
          res.json({
            status: false,
            message: "Phone number does not exist.",
          });
        }
      }
    }
  );
};
module.exports.forgetpassword = function (req, res) {
  const email = req.body.email;
  const postData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname, 
    phone: req.body.phone,
    password: req.body.password,
  };

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
  });
   
    const token = jwt.sign(JSON.parse(JSON.stringify(postData)), process.env.RESET_PASSWORD_KEY,
      { expiresIn: "10min" }
    );
    let mailOptions = {
      from: "no-reply@bkwiki.com",
      to: email,
      subject: "Account Reset Password",
      html: ` 
          You are receiving this because you have requested the reset of the password for your account. </br>

          Please click on the following link, or paste this into your browser to complete the process: 

          <a href="#">http://${process.env.CLIENT_URL}/resetpassword/${token}.</a></br>

          If you did not request this, please ignore this email and your password will remain unchanged.
       `,
    };

    transporter.sendMail(mailOptions, function(error, results) {
    //  console.log(mailOptions);
      if (error) {
        console.log("error occurs: ", error); 
        res.status(400).json({ error: "reset password link error" });
      }
      else
      {
       // console.log("Message is send");
        res.status(200).json({ 
          message: "The link have to send in the email go check"
        })
      }
    });
};

module.exports.resetPassword = function(req, res) {
    const email = req.body.email;
    const odlpass = req.body.password;
    const newpass = req.body;
     
}

