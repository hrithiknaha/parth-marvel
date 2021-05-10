import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const md5 = require("blueimp-md5");
const publickey = "a9985b299f04decc1427fb3b8d140dd6";
const privatekey = "f74a2c2d21ce4f90978e52bcd6d3108250293f1a";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/series";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

function Seriespage(props) {
	const [offset, setOffset] = useState(0);
	const [series, setSeries] = useState(null);
	const [page, setPage] = useState(props.match.params.page);
	useEffect(() => {
		getSdata();
	}, [page]);

	let getSdata = async () => {
		try {
			const data = await axios.get(
				url + "&offset=" + 20 * props.match.params.page + "&limit=20"
			);
			setSeries(data);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div
			style={{
				backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/362/830/501/simple-background-captain-america-white-background-marvel-comics-wallpaper-preview.jpg")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			{(series &&
				props.match.params.page > parseInt(series.data.data.total / 20)) ||
			props.match.params.page < 0 ? (
				<p>error 404 not found</p>
			) : (
				<div>
					<p>
						{series &&
							parseInt(series.data.data.total / 20) >
								props.match.params.page && (
								<Link
									to={`/series/page/${parseInt(props.match.params.page) + 1}`}
									onClick={() => setPage(parseInt(props.match.params.page) + 1)}
								>
									Next Page
								</Link>
							)}
					</p>

					<p>
						{props.match.params.page > 0 ? (
							<Link
								to={`/series/page/${parseInt(props.match.params.page) - 1}`}
								onClick={() => setPage(parseInt(props.match.params.page) - 1)}
							>
								Previous Page
							</Link>
						) : null}
					</p>
					{series &&
						series.data.data.results.map((s) => (
							<ul>
								<li>
									{" "}
									<Link to={`/series/${s.id}`}>{s.title}</Link>
								</li>
							</ul>
						))}
				</div>
			)}
		</div>
	);
}

export default Seriespage;
