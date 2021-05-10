import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function SeriesDetails(props) {
	const [series, setSeries] = useState();

	useEffect(() => {
		let getSeriesDetails = async () => {
			console.log(props.match.params.id);
			try {
				axios
					.get("/details/series/" + props.match.params.id)
					.then(({ data }) => {
						setSeries(data.results[0]);
					});
			} catch (e) {
				console.log(e);
			}
		};
		getSeriesDetails();
	}, [props.match.params.id]);

	return (
		<div>
			{series && (
				<div>
					<Card style={{ width: "25rem" }}>
						<Card.Body>
							<Card.Title>
								<b>Series Name: </b>
								{series.title}
							</Card.Title>
							<Card.Img
								variant="bottom"
								src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
							/>
							<Card.Text>{series.description}</Card.Text>
							<Card.Text>
								<b>Series Id:</b>
								{series.id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{series.stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Characters Available:</b>
								{series.characters.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			)}
		</div>
	);
}

export default SeriesDetails;
