import axios from "axios";
import { GET_COMICS } from "./types";

export const getComics = (page) => (dispatch) => {
	axios.get("/comics/page/" + page).then(({ data }) => {
		dispatch({
			type: GET_COMICS,
			payload: { results: data.results, total: data.total },
		});
	});
};
