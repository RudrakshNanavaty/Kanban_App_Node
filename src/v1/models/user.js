const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true,
			select: true
		}
	},
	schemaOptions
);

module.exports = mongoose.model('User', userSchema);