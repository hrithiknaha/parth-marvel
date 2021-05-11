import {
	GET_SERIE,
	GET_SERIES,
	SET_LOADING,
	SET_INDIVIDUAL_LOADING,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
	allSeriesLoading: true,
	series: null,
	total: null,
	serieLoading: true,
	serie: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SERIES:
			return {
				...state,
				allSeriesLoading: isEmpty(action.payload),
				series: action.payload.results,
				total: action.payload.total,
			};
		case SET_LOADING:
			return {
				...state,
				allSeriesLoading: action.payload,
			};
		case GET_SERIE:
			return {
				...state,
				serieLoading: isEmpty(action.payload),
				serie: action.payload,
			};
		case SET_INDIVIDUAL_LOADING:
			return {
				...state,
				serieLoading: action.payload,
			};
		default:
			return state;
	}
}
