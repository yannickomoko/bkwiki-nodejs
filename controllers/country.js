const connection = require('../config/db');


module.exports.getlocation = function(req, res) {
    connection.query("SELECT pays.id as 'id', pays.name as 'name', pays.id, atm_branch.name_bank as 'name_bank' FROM pays JOIN atm_branch on pays.id = atm_branch.id", (error, results) =>{
        
        console.log(results);
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

