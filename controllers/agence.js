const connection = require('../config/db');


 module.exports.getAllagences = function (req, res) {
    connection.query('SELECT * FROM banques', (error, results)=> {
      //  console.log(results);
         if(error){
             res.json({
                 status: false,
                 message: "there are some error with query"
             })
         }
         else
         {
             res.send(results);
         }
    });
 }

 module.exports.getID = function(req, res) {
     const id = req.params.id;
    connection.query('SELECT * FROM banques WHERE id=?', [id], (error, results) => {
       // console.log(results);
        if(error){
             res.json({
                 status: false,
                 message: "there are some error with query"
             })
        }
        else
        {
            res.send(results);
        }
    });
 }

 module.exports.getMonetique = function(req, res) {
     
    connection.query('SELECT * FROM monetique', (error, results) =>{
        if(error){
            res.json({
                 status: false,
                 message: "there are some error with query"
            })
        }
        else
        {
            res.send(results);
        }
    });
 }

 module.exports.getATM = function(req, res) {
    connection.query('SELECT * FROM atm_branch', (error, results) =>{
        if(error){
            res.json({
                 status: false,
                 message: "there are some error with query"
            })
        }
        else
        {
            res.send(results);
        }
    });
 }











