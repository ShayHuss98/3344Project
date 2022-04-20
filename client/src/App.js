import { useState, useEffect } from "react";
import Axios from "axios"; //Don't forget to Import Axios after you installed it.
import "./App.css";

function App() {
	//Create states values that we can save into our database.
	//A state is a React object that containts data about a component.
	//We instaniate hooks here which is used to create a dynamic webpage.
	const [gameImage, setGameImage] = useState("");
	const [gameName, setGameName] = useState("");
	const [gameDescription, setGameDescription] = useState("");
	const [rating, setRating] = useState(0);
	const [gameDifficulty, setGameDifficulty] = useState("");
	const [gamePublisher, setGamePublisher] = useState("");
	const [gameESRB, setGameESRB] = useState("");
	const [newGameName, setNewGameName] = useState("");

	//This state is an array that we will use to display the data.
	const [gameList, setGameList] = useState([]);

	//the useEffect Hook allows you to read the information using the array gameList when you refresh the page.
	useEffect(() => {
		Axios.get("http://localhost:3001/read").then((response) => {
			setGameList(response.data);
		});
	}, []); //You need the empty array at the end to let it know you only want to call it once.

	//Here with installed the package Axios, this library allows us to easily send HTTP Requests
	//To send information from our front end to our back end.
	const addToList = () => {
		Axios({
			method: "post",
			url: "http://localhost:3001/insert",
			headers: {},
			data: {
				gameImage: gameImage,
				gameName: gameName,
				rating: rating,
				gameDifficulty: gameDifficulty,
				gamePublisher: gamePublisher,
				gameESRB: gameESRB,
				gameDescription: gameDescription,
			},
		});
	};

	//Axios put request that takes the API route to update, passing through the ID from the database and the new input.
	const updateGame = (id) => {
		Axios({
			method: "PUT",
			url: "http://localhost:3001/update",
			data: {
				id: id,
				newGameName: newGameName,
			},
		});
	};

	//This Axios request passes an ID to the parameter, which deletes index in the database with the same ID.
	const deleteGame = (id) => {
		Axios.delete(`http://localhost:3001/delete/${id}`, {});
	};

	return (
		<div className="App">
			<div className="sidebar">
				<h1>
					<a
						href="https://cis-iis2.temple.edu/Spring2022/CIS3344_tuk09459/tutorial.html"
						target="_blank"
					>
						CIS3344 Term Project: ReactJS
					</a>
				</h1>
				<div className="input">
					{/* These functions below grab the inputs from our textboxes and saves them to our States. */}
					<label>Game Image</label>
					<input
						type="text"
						onChange={(event) => {
							setGameImage(event.target.value);
						}}
					/>
					<label>Game Name</label>
					<input
						required
						type="text"
						onChange={(event) => {
							setGameName(event.target.value);
						}}
					/>
					<label>Game Rating</label>
					<input
						required
						type="number"
						onChange={(event) => {
							setRating(event.target.value);
						}}
					/>
					<label>Game's Difficulty</label>
					<input
						required
						type="text"
						onChange={(event) => {
							setGameDifficulty(event.target.value);
						}}
					/>
					<label>Game's Publisher</label>
					<input
						required
						type="text"
						onChange={(event) => {
							setGamePublisher(event.target.value);
						}}
					/>
					<label>Game's ESRB Rating</label>
					<input
						required
						type="text"
						onChange={(event) => {
							setGameESRB(event.target.value);
						}}
					/>
					<label>Game Description</label>
					<input
						required
						type="text"
						onChange={(event) => {
							setGameDescription(event.target.value);
						}}
					/>
				</div>
				<button onClick={addToList}>Add To List</button>
			</div>

			<div className="reviews">
				<h1>Games</h1>

				{/* The map function allows us to grab the array and the index it exists in.  */}
				{gameList.map((val, key) => {
					return (
						// THis will render HTML with dynamic elements with Javascript.
						<div className="databaseEntry" key={key}>
							<div className="imageBox">
								{" "}
								<img className="entryImage" src={val.gameImage} />{" "}
							</div>
							<div className="entryInfo">
								<div className="entryHeader">
									{" "}
									<h1>{val.gameName}</h1>{" "}
								</div>
								<div className="gameContent">
									<p className="gameDesc">{val.gameDescription}</p>
									<ul className="gameInfo">
										<li>Publisher: {val.gamePublisher}</li>
										<li>ESRB Rating: {val.gameESRB}</li>
										<li>Rating: {val.gameRating} / 10</li>
										<li>Difficulty: {val.gameDifficulty}</li>
									</ul>
								</div>
								<div className="entryInputs">
									<div className="nameUpdate">
										{" "}
										<input
											type="text"
											placeholder="Update Game Name..."
											onChange={(event) => {
												setNewGameName(event.target.value);
											}}
										/>{" "}
									</div>
									<button
										className="entryBtn"
										onClick={() => updateGame(val._id)}
									>
										Update
									</button>
									<button
										className="deleteBtn"
										onClick={() => deleteGame(val._id)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
