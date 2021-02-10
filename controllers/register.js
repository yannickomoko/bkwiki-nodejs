const connection = require('../config/db');
const authUtils = require('../utils/auth');
const jwt = require('jsonwebtoken');


module.exports.register = function(req, res) {

    const today = new Date();
    const hash = authUtils.hashpassword(req.body.password); 

    const postData = {

      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      username: today.getTime()+' '+req.body.firstname,
      reg_number:today.getTime(),
      password: hash,
      created: today,
      modified: today

    } 
    var sql = `INSERT INTO users SET ?`;
    connection.query(sql, postData, (error, results) => { 
      if(error){ 
        res.json({
          success: 2,
          message:'there are some error with query'
        })
      }
      else {
          const jsontoken = jwt.sign(JSON.parse(JSON.stringify(postData)), process.env.JWT_KEY, {
            expiresIn: 10000
          });
          res.json({
            success: 1, 
            message:'user registered sucessfully',
            token: jsontoken
          })
      }
    });
  }