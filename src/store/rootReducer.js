import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import artworkReducer from "./artwork/reducers";

export default combineReducers({
  appState,
  user,
  artworkReducer,
});
