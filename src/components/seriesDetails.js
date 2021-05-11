import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { getSerie } from "../actions/series";
import { connect } from "react-redux";

function SeriesDetails(props) {
	useEffect(() => {
		props.getSerie(props.match.params.id);
	}, [props.match.params.id]);

	return (
		<div>
			{!props.series.serieLoading && (
				<div>
					<Card style={{ width: "25rem" }}>
						<Card.Body>
							<Card.Title>
								<b>Series Name: </b>
								{props.series.serie.title}
							</Card.Title>
							<Card.Img
								variant="bottom"
								src={`${props.series.serie.thumbnail.path}.${props.series.serie.thumbnail.extension}`}
							/>
							<Card.Text>{props.series.serie.description}</Card.Text>
							<Card.Text>
								<b>Series Id:</b>
								{props.series.serie.id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{props.series.serie.stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Characters Available:</b>
								{props.series.serie.characters.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	series: state.series,
});

export default connect(mapStateToProps, { getSerie })(SeriesDetails);
