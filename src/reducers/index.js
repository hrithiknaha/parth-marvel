import { combineReducers } from "redux";
import characters from "./characters";
import comics from "./comics";
import series from "./series";

export default combineReducers({ characters, comics, series });
