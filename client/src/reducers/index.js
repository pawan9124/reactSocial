import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import dashboardReducer from "./dashboardReducer";
import tripReducer from "./tripReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  dashboard: dashboardReducer,
  trip: tripReducer
});
