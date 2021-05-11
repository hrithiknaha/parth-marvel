import axios from "axios";
import {
	GET_CHARACTERS,
	SET_LOADING,
	GET_CHARACTER,
	SET_INDIVIDUAL_LOADING,
} from "./types";

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

export const getCharacter = (id) => (dispatch) => {
	dispatch({
		type: SET_INDIVIDUAL_LOADING,
		payload: true,
	});
	axios.get("/details/characters/" + id).then(({ data }) => {
		dispatch({
			type: GET_CHARACTER,
			payload: data.results[0],
		});
	});
};
