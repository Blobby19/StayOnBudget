var express = require('express');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(bodyParser());

app.use(session({secret:'stayonbudget',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

var api = express.Router();
require('./app/routes/api')(api, passport);
app.use('/api', api);

app.listen(1337);
console.log('Server started on port '+1337);