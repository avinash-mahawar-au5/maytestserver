const db = require('../database');
const Sequelize = require('sequelize');

let Score = db.define('score', {
	score_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	score: {
		type: Sequelize.STRING,
    },
    score_user_id:{
        type:Sequelize.INTEGER,
        references:{
            model:'user',
            key:'user_id'
        }
    }
}

db.sync().then((res) => {
	console.log('Score DB Created');
});

module.exports = Score;
