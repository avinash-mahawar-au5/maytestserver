const db = require('../database');
const Sequelize = require('sequelize');

let User = db.define('user', {
	user_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
		// allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		// allowNull: false,
	},

	password: {
		type: Sequelize.STRING,
	},

	// password2: {
	// 	type: Sequelize.STRING,
	// },
});

db.sync().then((res) => {
	console.log('User DB Created');
});

module.exports = User;
