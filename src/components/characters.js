import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const md5 = require("blueimp-md5");
const publickey = "a9985b299f04decc1427fb3b8d140dd6";
const privatekey = "f74a2c2d21ce4f90978e52bcd6d3108250293f1a";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

function Characterspage(props) {
	const [offset, setOffset] = useState(0);
	const [characters, setCharacters] = useState(null);
	const [page, setPage] = useState(props.match.params.page);

	useEffect(() => {
		getCdata();
	}, [page]);

	console.log(props);

	let getCdata = async () => {
		try {
			const data = await axios.get(
				url + "&offset=" + 20 * props.match.params.page + "&limit=20"
			);
			setCharacters(data);

			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div
			style={{
				backgroundImage: `url("https://image.winudf.com/v2/image/Y29tLmxpdGVhcHBzLm1hcnZlbHdhbGxwYXBlcl9zY3JlZW5fN18xNTI1NjgwNzUwXzAzMA/screen-7.jpg?h=710&fakeurl=1&type=.jpg")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			{(characters &&
				props.match.params.page > parseInt(characters.data.data.total / 20)) ||
			props.match.params.page < 0 ? (
				<p>error 404 not found</p>
			) : (
				<div>
					<p>
						{characters &&
							parseInt(characters.data.data.total / 20) >
								props.match.params.page && (
								<Link
									to={`/characters/page/${
										parseInt(props.match.params.page) + 1
									}`}
									onClick={() => setPage(parseInt(props.match.params.page) + 1)}
								>
									Next Page
								</Link>
							)}
					</p>

					<p>
						{props.match.params.page > 0 ? (
							<Link
								to={`/characters/page/${parseInt(props.match.params.page) - 1}`}
								onClick={() => setPage(parseInt(props.match.params.page) - 1)}
							>
								Previous Page
							</Link>
						) : null}
					</p>

					{characters &&
						characters.data.data.results.map((c) => (
							<ul>
								<li>
									{" "}
									<Link to={`/characters/${c.id}`}>{c.name}</Link>
								</li>
							</ul>
						))}
				</div>
			)}
		</div>
	);
}

export default Characterspage;
