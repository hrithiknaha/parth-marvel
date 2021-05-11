import {
	GET_COMIC,
	GET_COMICS,
	SET_LOADING,
	SET_INDIVIDUAL_LOADING,
} from "../actions/types";

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
		case GET_COMIC:
			return {
				...state,
				comicLoading: isEmpty(action.payload),
				comic: action.payload,
			};
		case SET_INDIVIDUAL_LOADING:
			return {
				...state,
				comicLoading: action.payload,
			};
		default:
			return state;
	}
}
