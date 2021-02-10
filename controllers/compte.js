const connection = require('../config/db');

module.exports.getTypeCompte = function (req, res) {
    connection.query('SELECT * FROM type_compte', (error, results) =>{
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

module.exports.getClients = function (req, res) {
    connection.query('SELECT * FROM clients', (error, results) =>{
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

module.exports.getIDclients = function (req, res) {
    const id = req.params.id;
    connection.query('SELECT * FROM type_client', [id], (error, results) =>{
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


