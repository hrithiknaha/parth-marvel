import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSeries } from "../actions/series";
import Loader from "./Loader";

function Seriespage(props) {
	const [page, setPage] = useState(props.match.params.page);

	useEffect(() => {
		props.getSeries(props.match.params.page);
	}, [page]);

	return (
		<div className="series">
			<div className="container">
				{(!props.series.allSeriesLoading &&
					props.match.params.page > parseInt(props.series.total / 20)) ||
				props.match.params.page < 0 ? (
					<p>error 404 not found</p>
				) : (
					<div>
						<p>
							{props.series.series &&
								parseInt(props.series.total / 20) > props.match.params.page && (
									<Link
										to={`/series/page/${parseInt(props.match.params.page) + 1}`}
										onClick={() =>
											setPage(parseInt(props.match.params.page) + 1)
										}
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
						{!props.series.allSeriesLoading ? (
							props.series.series.map((s) => (
								<ul>
									<li>
										{" "}
										<Link to={`/series/${s.id}`}>{s.title}</Link>
									</li>
								</ul>
							))
						) : (
							<Loader />
						)}
					</div>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	series: state.series,
});

export default connect(mapStateToProps, { getSeries })(Seriespage);
