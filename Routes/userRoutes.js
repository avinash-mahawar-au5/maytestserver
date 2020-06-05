const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const Users = require('../Models/userModal');
const getUser = require('../Helpers/helpers');
const createUser = require('../Helpers/helpers');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

const validateRegisterInput = require('../Validation/register');
const validateLoginInput = require('../Validation/login');

const bcrypt = require('bcryptjs');

jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretKey';

router.get('/', (req, res, next) => {
	res.json({ msg: 'Express is up!' });
});

router.get('/users', async (req, res, next) => {
	try {
		const { params } = req;
		let users = await Users.findAll();

		res.send(users);
	} catch (error) {
		console.log(error);
	}
});

router.post('/signup', async (req, res, next) => {
	// 	const data = {
	// 		firstName: req.body.firstName,
	// 		lastName: req.body.lastName,
	// 		email: req.body.email,
	// 		password: req.body.password,
	// 		password2: req.body.password2,
	// 	};
	// 	// Form validation
	// 	const { errors, isValid } = validateRegisterInput(req.body);
	// 	// Check validation
	// 	if (!isValid) {
	// 		return res.status(400).json(errors);
	// 	}
	// 	let op = await Users.findOne({ email: data.email });
	// 	console.log('op', op);
	// 	if (op !== null) {
	// 		return res.status(400).json({ email: 'Email already exists' });
	// 	} else {
	// 		// console.log(data.password);
	// 		// Hash password before saving in database
	// 		bcrypt.genSalt(10, (err, salt) => {
	// 			bcrypt.hash(data.password, salt, async (err, hash) => {
	// 				// console.log('df', data.password);
	// 				if (err) throw err;
	// 				data.password = hash;
	// 				// console.log(data);
	// 				let users = await Users.create(data);
	// 				res.send(users);
	// 			});
	// 		});
	// 		// var hash = bcrypt.hashSync(data.password, 10);
	// 		// data.password = hash;
	// 		// var osl = {};
	// 		// let newData = Users.create(data);
	// 		// res.send(newData);
	// 	}
	// const { errors, isValid } = validateLoginInput(req.body);
	// // Check validation
	// if (!isValid) {
	// 	return res.status(400).json(errors);
	// 	Users.findOne({ email: req.body.email }).then((user) => {
	// 		if (user) {
	// 			return res.status(400).json({ email: 'Email already exists' });
	// 		} else {
	// 			let user = Users.create;
	// 		}
	// 	});
	// 	// register route
	// 	const { body } = req;
	// 	let user = Users.create({
	// 		firstName: req.body.firstName,
	// 		lastName: req.body.lastName,
	// 		email: req.body.email,
	// 		password: req.body.password,
	// 	})
	// 		.then((user) => {
	// 			res.json({ user, msg: 'account created successfully' });
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }
	try {
		const { body } = req;
		let user = await Users.create({
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			password: body.password,
		});
		res.json({ user, msg: 'account created successfully' });
	} catch (error) {
		console.log(error);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (email && password) {
			// we get the user with the name and save the resolved promise returned
			let user = await getUser({ email });
			if (!user) {
				res.status(401).json({ msg: 'No such user found', user });
			}
			if (user.password === password) {
				// from now on we’ll identify the user by the id
				// and the id is the only personalized value that goes into our token

				let payload = { id: user.id };
				let token = jwt.sign(payload, jwtOptions.secretOrKey, {
					expiresIn: '2m',
				});
				res.json({ msg: 'ok', token: token });
			} else {
				res.status(401).json({ msg: 'password is incorrect' });
			}
		}
	} catch (error) {
		console.log(error);
	}
});

router.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({ msg: 'congrats! you are authorised user now' });
	}
);

module.exports = router;
