var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var GoogleClientLogin = require("googleclientlogin").GoogleClientLogin;
var GoogleSpreadsheets = require("google-spreadsheets");



app.use(bodyParser());


var port = process.env.PORT || 8282; 		// set our port


var router = express.Router();

var config=require('./config.js')

var googleAuth = new GoogleClientLogin({
    email: config.email,
    password: config.password,
    service: 'spreadsheets',
    accountType: GoogleClientLogin.accountTypes.google
});


router.get('/proposal', function(req, res) {

	var proposals=[];

    res.setHeader("Content-Type", "application/json");

	googleAuth.on(GoogleClientLogin.events.login, function(){
    GoogleSpreadsheets({
        key: "0Atd5qwwDGGk7dGh0YkhGQ3paX3FGbTNYNmZHRTM5TkE",
        auth: googleAuth.getAuthId()
    }, function(err, spreadsheet) {
        spreadsheet.worksheets[0].cells({ range: "R1C1:R99C21" },function(err, result) {
		var i=2;
		while (i < spreadsheet.worksheets[0].rowCount) {
			if (result.cells[i] != undefined) {
				var proposal=new Object();
				proposal.speaker=result.cells[i][3].value+" "+result.cells[i][19].value;
				proposal.title=result.cells[i][2].value;
				proposal.description=result.cells[i][12].value;
				proposal.explaination=result.cells[i][13].value;
				proposal.type=result.cells[i][11].value;
				proposal.bio=result.cells[i][7].value;
				proposal.email=result.cells[i][4].value;
				if (result.cells[i][5]!=undefined) {
		    		proposal.job=result.cells[i][5].value;
		    	}
		    	if (result.cells[i][6]!=undefined) {
		    		proposal.company=result.cells[i][6].value;
		    	}
		    	if (result.cells[i][8]!=undefined) {
		    		proposal.cospeaker=result.cells[i][8].value;
		    	}
		    	proposal.theme=result.cells[i][9].value;
		    	proposal.format=result.cells[i][10].value;
		    	//proposal.needs=result.cells[i][13].value;
		    	if (result.cells[i][14]!=undefined) {
		    		proposal.needs=result.cells[i][14].value;
		    	}
		    	if (result.cells[i][15]!=undefined) {
		    		proposal.twitter=result.cells[i][15].value;
		    	}
		    	if (result.cells[i][16]!=undefined) {
		    		proposal.blog=result.cells[i][16].value;
		   		}
		    	if (result.cells[i][17]!=undefined) {
		    		proposal.sharing=result.cells[i][17].value;
		    	}
		    	proposal.level=result.cells[i][20].value;
		    	proposals.push(proposal);
		 		} 
		    i++;
		}
		res.write(JSON.stringify(proposals));
        res.end();
		});
    });
});

googleAuth.login();
		
});

app.use('/', express.static(__dirname + '/html'));

app.use('/api', router);

app.listen(port);
