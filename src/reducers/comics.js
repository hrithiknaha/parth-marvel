import { GET_COMICS, SET_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
	allComicsLoading: true,
	comics: null,
	total: null,
	comicLoading: true,
	comic: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_COMICS:
			return {
				...state,
				allComicsLoading: isEmpty(action.payload),
				comics: action.payload.results,
				total: action.payload.total,
			};
		case SET_LOADING:
			return {
				...state,
				allComicsLoading: action.payload,
			};
		default:
			return state;
	}
}
