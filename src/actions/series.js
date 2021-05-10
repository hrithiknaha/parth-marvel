import axios from "axios";
import { GET_SERIES } from "./types";

export const getSeries = (page) => (dispatch) => {
	axios.get("/series/page/" + page).then(({ data }) => {
		dispatch({
			type: GET_SERIES,
			payload: { results: data.results, total: data.total },
		});
	});
};
