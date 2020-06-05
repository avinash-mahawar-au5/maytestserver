const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


var getUser = require('./Helpers/helpers');

var userRouter = require('./Routes/userRoutes');
var quizRouter = require('./Routes/quizRoute');

// import passport and passport-jwt
const passport = require('passport');
const passportJWT = require('passport-jwt');

// Extract JWT To extract the token
let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretKey';
// create our Strategy

let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
	console.log('payload recieved', jwt_payload);

	let user = getUser({ id: jwt_payload.id });
	if (user) {
		next(null, user);
	} else {
		next(null, false);
	}
});

// use Strategy

passport.use(strategy);

// app
const app = express();
// initilise passport with express
app.use(passport.initialize());

// parse application/json
app.use(bodyParser.json());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// passport initilize
app.use(passport.initialize());


app.use('/', userRouter);
app.use('/', quizRouter);

module.exports = app;
