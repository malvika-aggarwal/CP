/** Requiring modules */
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose')
var {
	port
} = require('./server/config');
var path = require('path');
require('./server/routes')(router);

/**For logging purpose */
app.use(morgan('dev'));

/** it will parse the data comming from user end */
app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));
app.use(bodyParser.json({
	limit: '50mb',
	extended: true
}));

/** set headers for the API's */
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Orgin', '*');
	res.setHeader('Access-Control-Allow-Method', 'GET,POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Request-With,content-type,\Authorization');
	next();
});

/** connection with database
 * mongodb- type of database
 * localhost - domain for that database
 * 27017 - port for the database , bydefault mongo is installed on 27017 port
 * united-natons - name of the database
 */
mongoose.connect('mongodb://localhost:27017/united-nations', {
	useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log('MONGO: successfully connected to db');
});

/** connecting server with public folder */
app.use(express.static(__dirname + '/public'));

app.use('/', router);

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port);
console.log("Magic happens on port" + port);