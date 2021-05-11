import axios from "axios";
import { GET_CHARACTERS, SET_LOADING } from "./types";

export const getCharacters = (page) => (dispatch) => {
	dispatch({
		type: SET_LOADING,
		payload: true,
	});
	axios.get("/characters/page/" + page).then(({ data }) => {
		dispatch({
			type: GET_CHARACTERS,
			payload: { results: data.results, total: data.total },
		});
	});
};
