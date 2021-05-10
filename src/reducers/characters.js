import { GET_CHARACTERS } from "../actions/types";

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
		default:
			return state;
	}
}
