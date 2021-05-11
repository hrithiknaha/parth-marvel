import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { getComic } from "../actions/comics";
import Loader from "./Loader";

function ComicDetails(props) {
	useEffect(() => {
		props.getComic(props.match.params.id);
	}, [props.match.params.id]);

	return (
		<div>
			{!props.comics.comicLoading ? (
				<div>
					<Card className="card">
						<Card.Body>
							<Card.Title>
								<b>Comic Name: </b>
								{props.comics.comic.title}
							</Card.Title>
							<Card.Img
								variant="bottom"
								src={`${props.comics.comic.thumbnail.path}.${props.comics.comic.thumbnail.extension}`}
							/>
							<Card.Text>{props.comics.comic.description}</Card.Text>
							<Card.Text>
								<b>Comic Id:</b>
								{props.comics.comic.id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{props.comics.comic.stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Characters Available:</b>
								{props.comics.comic.characters.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	comics: state.comics,
});

export default connect(mapStateToProps, { getComic })(ComicDetails);
