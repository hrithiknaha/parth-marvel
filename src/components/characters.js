import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCharacters } from "../actions/characters";

function Characterspage(props) {
	const [page, setPage] = useState(props.match.params.page);

	useEffect(() => {
		props.getCharacters(props.match.params.page);
	}, [page]);

	return (
		<div
			style={{
				backgroundImage: `url("https://image.winudf.com/v2/image/Y29tLmxpdGVhcHBzLm1hcnZlbHdhbGxwYXBlcl9zY3JlZW5fN18xNTI1NjgwNzUwXzAzMA/screen-7.jpg?h=710&fakeurl=1&type=.jpg")`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			{(props.characters.characters &&
				props.match.params.page > parseInt(props.characters.total / 20)) ||
			props.match.params.page < 0 ? (
				<p>error 404 not found</p>
			) : (
				<div>
					<p>
						{props.characters.characters &&
							parseInt(props.characters.total / 20) >
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

					{props.characters.characters &&
						props.characters.characters.map((c) => (
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

const mapStateToProps = (state) => ({
	characters: state.characters,
});

export default connect(mapStateToProps, { getCharacters })(Characterspage);
