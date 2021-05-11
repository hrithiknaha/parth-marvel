import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getComics } from "../actions/comics";

function Comicspage(props) {
	const [page, setPage] = useState(props.match.params.page);

	useEffect(() => {
		props.getComics(props.match.params.page);
	}, [page]);

	return (
		<div className="comics">
			{(!props.comics.allComicsLoading &&
				props.match.params.page > parseInt(props.comics.total / 20)) ||
			props.match.params.page < 0 ? (
				<p>error 404 not found</p>
			) : (
				<div>
					<p>
						{props.comics.comics &&
							parseInt(props.comics.total / 20) > props.match.params.page && (
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

					{!props.comics.allComicsLoading &&
						props.comics.comics.map((c) => (
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

const mapStateToProps = (state) => ({
	comics: state.comics,
});

export default connect(mapStateToProps, { getComics })(Comicspage);
