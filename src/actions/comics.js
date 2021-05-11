import axios from "axios";
import {
	GET_COMIC,
	GET_COMICS,
	SET_LOADING,
	SET_INDIVIDUAL_LOADING,
} from "./types";

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

export const getComic = (id) => (dispatch) => {
	dispatch({
		type: SET_INDIVIDUAL_LOADING,
		payload: true,
	});
	axios.get("/details/comics/" + id).then(({ data }) => {
		dispatch({
			type: GET_COMIC,
			payload: data.results[0],
		});
	});
};
