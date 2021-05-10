import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function CharacterDetails(props) {
	const [character, setCharacter] = useState();

	useEffect(() => {
		let getcharacterDetails = async () => {
			console.log(props.match.params.id);
			try {
				axios
					.get("/details/characters/" + props.match.params.id)
					.then(({ data }) => {
						setCharacter(data.results[0]);
					});
			} catch (e) {
				console.log(e);
			}
		};
		getcharacterDetails();
	}, [props.match.params.id]);

	return (
		<div>
			{character && (
				<div>
					<Card style={{ width: "25rem" }}>
						<Card.Body>
							<Card.Img
								variant="top"
								src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
							/>
							<Card.Title>
								<b>Character Name: </b>
								{character.name}
							</Card.Title>
							<Card.Text>{character.description}</Card.Text>
							<Card.Text>
								<b>Character Id:</b>
								{character.id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{character.stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Comics Available:</b>
								{character.comics.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			)}
		</div>
	);
}

export default CharacterDetails;
