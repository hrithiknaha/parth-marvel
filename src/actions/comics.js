import axios from "axios";
import { GET_COMICS, SET_LOADING } from "./types";

export const getComics = (page) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	axios.get("/comics/page/" + page).then(({ data }) => {
		dispatch({
			type: GET_COMICS,
			payload: { results: data.results, total: data.total },
		});
	});
};
