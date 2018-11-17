import Axios from "axios";
import {
  ADD_LOCATION,
  LOADING_LOCATIONS,
  GET_LOCATION,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

//Add POST
export const addLocation = postData => dispatch => {
  dispatch(clearErrors());
  Axios.post("/api/dashboard", postData)
    .then(res =>
      dispatch({
        type: ADD_LOCATION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//create post loading
export const locationsLoading = () => {
  return {
    type: LOADING_LOCATIONS
  };
};

//create post loading
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
