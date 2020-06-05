const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const Questions = require('../Models/questionModel');

router.post('/questions', async (req, res, next) => {
	try {
		const { body } = req;

		let questions = await Questions.create({
			question: body.question,
			options: body.options,
			correct_ans: body.correct_ans,
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
