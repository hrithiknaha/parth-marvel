import axios from "axios";
import { GET_CHARACTERS } from "./types";

export const getCharacters = (page) => (dispatch) => {
	axios.get("/characters/page/" + page).then(({ data }) => {
		dispatch({
			type: GET_CHARACTERS,
			payload: { results: data.results, total: data.total },
		});
	});
};
