const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const cors = require('cors'); 

const PageRouter = require('./routes/postData');

const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
 
 
app.use('/bkwiki', PageRouter);

app.listen(7000, () => {
    console.log('Starting server in port 7000');
});




