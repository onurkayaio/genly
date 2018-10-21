import { combineReducers } from "redux";
import spotify from "./spotify_reducer";
import tumblr from "./tumblr_reducer";

const rootReducer = combineReducers({
  spotify,
  tumblr
});

export default rootReducer;
