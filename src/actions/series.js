import axios from "axios";
import { GET_SERIES, SET_LOADING } from "./types";

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
