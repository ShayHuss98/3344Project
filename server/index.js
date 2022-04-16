const express = require("express"); //Calls the express server
const mongoose = require("mongoose"); //Imports mongoose library
const cors = require("cors"); //Imports the cors package.
const app = express(); //Initializes the express server

const GameModel = require("./models/Games"); //Imports our schema model

app.use(express.json()); //Sends front end information in JSON format.
app.use(cors()); //Implements cors into the project allowing our backend to communicate with our front end

mongoose.connect(
	//Connects us to our mongoose database
	"mongodb+srv://NewStudent:yTYkbkZLGn4ywjkZ@3344.d0869.mongodb.net/games?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
	}
);

//This creates a route between the back end and the front end so that wave save data into our database.
//You will need to install a package called cors
app.post("/insert", async (req, res) => {
	const game = new GameModel({
		gameImage: req.body.gameImage,
		gameName: req.body.gameName,
		gameRating: req.body.rating,
		gameDifficulty: req.body.gameDifficulty,
		gamePublisher: req.body.gamePublisher,
		gameESRB: req.body.gameESRB,
		gameDescription: req.body.gameDescription,
	});

	try {
		await game.save();
		res.send("inserted data");
	} catch (err) {
		console.log(err);
	}
});

//This route displays all the information that has been sent to our database by using mongoose syntax.
app.get("/read", async (req, res) => {
	GameModel.find({}, (err, result) => {
		//By passing an empty object we grab all the data.
		if (err) {
			res.send(err); //Returns our errors if there is an error
		}

		res.send(result); //If no errors it just sends us our data.
	});
});

app.put("/update", async (req, res) => {
	const newGameName = req.body.newGameName; //Grab the new game name
	const id = req.body.id; //Grabs the id of the database entry

	try {
		await GameModel.findById(id, (err, updatedGame) => {
			//Finds the id and grabs the update game name
			updatedGame.gameName = newGameName; //Takes the entry by ID, access the name Value, and renames it.
			updatedGame.save();
			res.send("Successfully updated");
		});
	} catch (err) {
		console.log(err);
	}
});

// This whole function Deletes the element in the database that has the same ID
app.delete("/delete/:id", async (req, res) => {
	const id = req.params.id;

	await GameModel.findByIdAndRemove(id).exec(); //Mongoose has its own function that finds the element and removes it.
	res.send("Successfully deleted");
});

app.listen(3001, () => {
	console.log("Server running on port 3001..."); //Passes a port for our server to run on.
});
