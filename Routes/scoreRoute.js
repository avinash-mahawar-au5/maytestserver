const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const Score = require('../Models/scoreModel');

router.post('/send_score', async (req, res, next) => {
	try {
		const { body } = req;

		let score = await Score.create({
			score: body.score,
			score_user_id: body.score_user_id,
		});
		res.send(questions);
	} catch (error) {
		console.log(error);
	}
});

router.get('/questions', async (req, res, nexy) => {
	try {
		const { params } = req;

		let questions = await Questions.findAll();
		res.send(questions);
	} catch (error) {
		console.log(error);
	}
});
router.delete('/delete/:id', async (req, res, next) => {
	try {
		const { params } = req;
		let question = await Questions.destroy({
			where: { question_id: params.id },
		});

		res.send('deleted successfully');
	} catch (error) {
		console.log(error);
	}
});
module.exports = router;
