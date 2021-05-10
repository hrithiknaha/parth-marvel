import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const md5 = require("blueimp-md5");
const publickey = "a9985b299f04decc1427fb3b8d140dd6";
const privatekey = "f74a2c2d21ce4f90978e52bcd6d3108250293f1a";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/comics/";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

function ComicDetails(props) {
	const [comic, setComic] = useState();

	useEffect(() => {
		let getComicDetails = async () => {
			console.log(props.match.params.id);
			try {
				axios
					.get("/details/comics/" + props.match.params.id)
					.then(({ data }) => {
						setComic(data.results[0]);
					});
			} catch (e) {
				console.log(e);
			}
		};
		getComicDetails();
	}, [props.match.params.id]);

	return (
		<div>
			{comic && (
				<div>
					<Card style={{ width: "25rem" }}>
						<Card.Body>
							<Card.Title>
								<b>Comic Name: </b>
								{comic.title}
							</Card.Title>
							<Card.Img
								variant="bottom"
								src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
							/>
							<Card.Text>{comic.description}</Card.Text>
							<Card.Text>
								<b>Comic Id:</b>
								{comic.id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{comic.stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Characters Available:</b>
								{comic.characters.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			)}
		</div>
	);
}

export default ComicDetails;
