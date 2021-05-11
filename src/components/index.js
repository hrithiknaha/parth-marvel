import React, { Component } from "react";

import { Link } from "react-router-dom";
import "react-bootstrap";

class index extends Component {
	render() {
		return (
			<div className="App-logo">
				<header className="App-header">
					{
						<img
							height="200"
							width="400"
							src="https://static3.srcdn.com/wordpress/wp-content/uploads/2019/12/marvel-logo-header.jpg"
							className="App"
							alt="logo"
							style={({ width: 200 }, { height: 100 }, { background: 555 })}
						/>
					}
					<h1>Marvelous !</h1>
					<h5>Scroll for more !</h5>
					<h5> Brought to you by Parth Purohit</h5>
				</header>
				<div className="container home">
					<h1 className="home-text">For Marvel Fans !</h1>
					<p className="home-subtext">
						The Marvel Cinematic Universe (MCU) is an American media franchise
						and shared universe centered on a series of superhero films,
						independently produced by Marvel Studios and based on characters
						that appear in American comic books published by Marvel Comics. The
						franchise includes comic books, short films, television series, and
						digital series. The shared universe, much like the original Marvel
						Universe in comic books, was established by crossing over common
						plot elements, settings, cast, and characters.
					</p>
					<p>
						This App uses Marvel's Developer API. Using the API, we are able to
						access a large number of data about marvel's universe.{" "}
					</p>
					<p>Following links will help under the working in a better way:</p>

					<div className="home-links">
						<Link className="marvelLink" to="/characters/page/0">
							Characters
						</Link>
						<br />
						<Link className="marvelLink" to="/comics/page/0">
							Comics
						</Link>
						<br />
						<Link className="marvelLink" to="/series/page/0">
							Series
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default index;
