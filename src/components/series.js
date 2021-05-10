import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Seriespage(props) {
	const [offset, setOffset] = useState(0);
	const [series, setSeries] = useState();
	const [page, setPage] = useState(props.match.params.page);
	const [total, setTotal] = useState();

	useEffect(() => {
		const getCdata = async () => {
			try {
				axios
					.get("/series/page/" + props.match.params.page)
					.then(({ data }) => {
						setSeries(data.results);
						setTotal(data.total);
					});
			} catch (e) {
				console.log(e);
			}
		};
		getCdata();
	}, [page]);

	return (
		<div
			style={{
				backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/362/830/501/simple-background-captain-america-white-background-marvel-comics-wallpaper-preview.jpg")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			{(series && props.match.params.page > parseInt(total / 20)) ||
			props.match.params.page < 0 ? (
				<p>error 404 not found</p>
			) : (
				<div>
					<p>
						{series && parseInt(total / 20) > props.match.params.page && (
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
						series.map((s) => (
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
