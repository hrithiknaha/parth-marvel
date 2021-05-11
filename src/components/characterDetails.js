import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { getCharacter } from "../actions/characters";

import "bootstrap/dist/css/bootstrap.min.css";

function CharacterDetails(props) {
	useEffect(() => {
		props.getCharacter(props.match.params.id);
	}, [props.match.params.id]);

	return (
		<div>
			{!props.characters.characterLoading && (
				<div>
					<Card style={{ width: "25rem" }}>
						<Card.Body>
							<Card.Img
								variant="top"
								src={`${props.characters.character.thumbnail.path}.${props.characters.character.thumbnail.extension}`}
							/>
							<Card.Title>
								<b>Character Name: </b>
								{props.characters.character.name}
							</Card.Title>
							<Card.Text>{props.characters.character.description}</Card.Text>
							<Card.Text>
								<b>Character Id:</b>
								{props.characters.character.id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{props.characters.character.stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Comics Available:</b>
								{props.characters.character.comics.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	characters: state.characters,
});

export default connect(mapStateToProps, { getCharacter })(CharacterDetails);
