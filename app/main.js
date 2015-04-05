var express    = require('express'); 		// call express
var moment = require('moment');
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var auth = require('basic-auth-old')({
    name: 'CFP CES',
    accounts: [
        process.env.config_ba_login+':'+process.env.config_ba_password
    ]
}).auth;

var GoogleSpreadsheets = require("google-spreadsheets");


app.all('*',auth);

app.use(bodyParser());


var port = process.env.PORT || 8282; 		// set our port


var router = express.Router();



app.use('/', express.static(__dirname + '/html'));

app.use('/api', router);



app.listen(port);

