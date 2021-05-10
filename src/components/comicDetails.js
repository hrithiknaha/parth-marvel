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
	const [comicData, setcomicData] = useState(null);

	useEffect(() => {
		getcomicDetails();
	}, [props.match.params.id]);

	let getcomicDetails = async () => {
		try {
			// console.log(baseUrl + props.match.params.id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
			const data = await axios.get(
				baseUrl +
					props.match.params.id +
					"?ts=" +
					ts +
					"&apikey=" +
					publickey +
					"&hash=" +
					hash
			);

			setcomicData(data);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			{comicData && (
				<div>
					<Card style={{ width: "25rem" }}>
						<Card.Body>
							<Card.Title>
								<b>Comic Name: </b>
								{comicData.data.data.results[0].title}
							</Card.Title>
							<Card.Img
								variant="bottom"
								src={`${comicData.data.data.results[0].thumbnail.path}.${comicData.data.data.results[0].thumbnail.extension}`}
							/>
							<Card.Text>
								{comicData.data.data.results[0].description}
							</Card.Text>
							<Card.Text>
								<b>Comic Id:</b>
								{comicData.data.data.results[0].id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{comicData.data.data.results[0].stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Characters Available:</b>
								{comicData.data.data.results[0].characters.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			)}
		</div>
	);
}

export default ComicDetails;
