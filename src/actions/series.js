import axios from "axios";
import {
	GET_SERIE,
	GET_SERIES,
	SET_LOADING,
	SET_INDIVIDUAL_LOADING,
} from "./types";

export const getSeries = (page) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	axios.get("/series/page/" + page).then(({ data }) => {
		dispatch({
			type: GET_SERIES,
			payload: { results: data.results, total: data.total },
		});
	});
};

export const getSerie = (id) => (dispatch) => {
	dispatch({
		type: SET_INDIVIDUAL_LOADING,
		payload: true,
	});
	axios.get("/details/series/" + id).then(({ data }) => {
		dispatch({
			type: GET_SERIE,
			payload: data.results[0],
		});
	});
};
