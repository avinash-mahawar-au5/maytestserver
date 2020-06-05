const db = require('../database');
const Sequelize = require('sequelize');

let Questions = db.define('questions', {
	question_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	question: {
		type: Sequelize.STRING(10000),
	},
	options: {
		type: Sequelize.ARRAY(Sequelize.STRING),
	},
	correct_ans: {
		type: Sequelize.STRING(1000),
	},
});

db.sync().then((res) => {
	console.log('Question DB Created');
});

module.exports = Questions;
