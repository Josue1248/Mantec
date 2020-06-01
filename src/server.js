const express = require('express');
const app = express();
var session = require('express-session');
var passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors')



const routes = require('./routes/routes');

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// Express Session Middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

app.use(function(error, req, res, next) {
	console.error(error.stack);
	res.status(500).send({
		message: 'Something is wrong'
	})
});

app.use('/', routes);
