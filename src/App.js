import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import index from "./components/index";
import characters from "./components/characters";
import characterDetails from "./components/characterDetails";
import comics from "./components/comics";
import comicDetails from "./components/comicDetails";
import series from "./components/series";
import seriesDetails from "./components/seriesDetails";
import errorpage from "./components/error";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={index} />
				<Route exact path="/characters/page/:page" component={characters} />
				<Route exact path="/comics/page/:page" component={comics} />
				<Route exact path="/series/page/:page" component={series} />
				<Route exact path="/characters/:id" component={characterDetails} />
				<Route exact path="/comics/:id" component={comicDetails} />
				<Route exact path="/series/:id" component={seriesDetails} />
				<Route path="*" exact component={errorpage} status={404} />
			</Switch>
		</Router>
	);
}

export default App;
