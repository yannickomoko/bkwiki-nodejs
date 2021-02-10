const  nodemailer = require('nodemailer');


const smtptransporter = nodemailer.createTransport('SMTP', {
    service: "gmail",
    auth: {
        user: "oambiana@gmail.com",
        password: "carla@2014"
    }
});