const mongoose = require("mongoose");

//This is our schema, this defines the structure of our games table.
//We have different data types that we can insert elements/values into
//We can also make them required to the database here as well.

const GamesSchema = new mongoose.Schema({
	gameImage: {
		type: String,
		required: true,
	},
	gameName: {
		type: String,
		required: true,
	},
	gameRating: {
		type: Number,
		required: true,
	},
	gameDifficulty: {
		type: String,
		required: true,
	},
	gamePublisher: {
		type: String,
		required: true,
	},
	gameESRB: {
		type: String,
		required: true,
	},
	gameDescription: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Games", GamesSchema);
