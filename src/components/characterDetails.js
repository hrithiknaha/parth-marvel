import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
const md5 = require("blueimp-md5");
const publickey = "a9985b299f04decc1427fb3b8d140dd6";
const privatekey = "f74a2c2d21ce4f90978e52bcd6d3108250293f1a";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters/";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

function CharacterDetails(props) {
	const [characterData, setcharacterData] = useState(null);

	useEffect(() => {
		getcharacterDetails();
	}, [props.match.params.id]);

	let getcharacterDetails = async () => {
		try {
			console.log(
				baseUrl +
					props.match.params.id +
					"?ts=" +
					ts +
					"&apikey=" +
					publickey +
					"&hash=" +
					hash
			);
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

			setcharacterData(data);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			{characterData && (
				<div>
					<Card style={{ width: "25rem" }}>
						<Card.Body>
							<Card.Img
								variant="top"
								src={`${characterData.data.data.results[0].thumbnail.path}.${characterData.data.data.results[0].thumbnail.extension}`}
							/>
							<Card.Title>
								<b>Character Name: </b>
								{characterData.data.data.results[0].name}
							</Card.Title>
							<Card.Text>
								{characterData.data.data.results[0].description}
							</Card.Text>
							<Card.Text>
								<b>Character Id:</b>
								{characterData.data.data.results[0].id}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Stories Available:</b>
								{characterData.data.data.results[0].stories.available}
							</Card.Text>
							<Card.Text>
								{" "}
								<b>Comics Available:</b>
								{characterData.data.data.results[0].comics.available}
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			)}
		</div>
	);
}

export default CharacterDetails;
