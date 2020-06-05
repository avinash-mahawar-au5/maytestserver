const User = require('../Models/userModal');

// const createUser = async ({ name, password }) => {
// 	return await User.create({ name, password });
// };

// const getAllUsers = async () => {
// 	return await User.findAll();
// };

const getUser = async (obj) => {
	return await User.findOne({
		where: obj,
	});
};

module.exports = getUser;
