import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Comicspage(props) {
	const [offset, setOffset] = useState(0);
	const [comics, setComics] = useState();
	const [page, setPage] = useState(props.match.params.page);
	const [total, setTotal] = useState();

	useEffect(() => {
		const getCdata = async () => {
			try {
				axios
					.get("/comics/page/" + props.match.params.page)
					.then(({ data }) => {
						setComics(data.results);
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
				backgroundImage: `url("https://image.winudf.com/v2/image/Y29tLmxpdGVhcHBzLm1hcnZlbHdhbGxwYXBlcl9zY3JlZW5fM18xNTI1NjgwNzQ4XzA3NQ/screen-3.jpg?h=710&fakeurl=1&type=.jpg")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			{(comics && props.match.params.page > parseInt(total / 20)) ||
			props.match.params.page < 0 ? (
				<p>error 404 not found</p>
			) : (
				<div>
					<p>
						{comics && parseInt(total / 20) > props.match.params.page && (
							<Link
								to={`/comics/page/${parseInt(props.match.params.page) + 1}`}
								onClick={() => setPage(parseInt(props.match.params.page) + 1)}
							>
								Next Page
							</Link>
						)}
					</p>

					<p>
						{props.match.params.page > 0 ? (
							<Link
								to={`/comics/page/${parseInt(props.match.params.page) - 1}`}
								onClick={() => setPage(parseInt(props.match.params.page) - 1)}
							>
								Previous Page
							</Link>
						) : null}
					</p>

					{comics &&
						comics.map((c) => (
							<ul>
								<li>
									{" "}
									<Link to={`/comics/${c.id}`}>{c.title}</Link>
								</li>
							</ul>
						))}
				</div>
			)}
		</div>
	);
}

export default Comicspage;
