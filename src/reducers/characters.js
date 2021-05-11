import {
	GET_CHARACTER,
	GET_CHARACTERS,
	SET_INDIVIDUAL_LOADING,
	SET_LOADING,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
	allCharactersLoading: true,
	characters: null,
	total: null,
	characterLoading: true,
	character: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CHARACTERS:
			return {
				...state,
				allCharactersLoading: isEmpty(action.payload),
				characters: action.payload.results,
				total: action.payload.total,
			};
		case SET_LOADING:
			return {
				...state,
				allCharactersLoading: action.payload,
			};
		case GET_CHARACTER:
			return {
				...state,
				characterLoading: isEmpty(action.payload),
				character: action.payload,
			};
		case SET_INDIVIDUAL_LOADING:
			return {
				...state,
				characterLoading: action.payload,
			};
		default:
			return state;
	}
}
