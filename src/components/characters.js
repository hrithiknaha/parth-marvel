import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Characterspage(props) {
	const [offset, setOffset] = useState(0);
	const [characters, setCharacters] = useState();
	const [page, setPage] = useState(props.match.params.page);
	const [total, setTotal] = useState();

	useEffect(() => {
		const getCdata = async () => {
			try {
				axios
					.get("/characters/page/" + props.match.params.page)
					.then(({ data }) => {
						setCharacters(data.results);
						setTotal(data.total);
					});
			} catch (e) {
				console.log(e);
			}
		};
		getCdata();
	}, [page]);

	console.log("/characters/page/" + props.match.params.page);

	return (
		<div
			style={{
				backgroundImage: `url("https://image.winudf.com/v2/image/Y29tLmxpdGVhcHBzLm1hcnZlbHdhbGxwYXBlcl9zY3JlZW5fN18xNTI1NjgwNzUwXzAzMA/screen-7.jpg?h=710&fakeurl=1&type=.jpg")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			{(characters && props.match.params.page > parseInt(total / 20)) ||
			props.match.params.page < 0 ? (
				<p>error 404 not found</p>
			) : (
				<div>
					<p>
						{characters && parseInt(total / 20) > props.match.params.page && (
							<Link
								to={`/characters/page/${parseInt(props.match.params.page) + 1}`}
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
						characters.map((c) => (
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
