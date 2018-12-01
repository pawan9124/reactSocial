import Axios from "axios";
import {
  ADD_LOCATION,
  LOADING_LOCATIONS,
  GET_LOCATION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SINGLE_LOCATION,
  GET_TOP_LOCATIONS
} from "./types";

//Add POST
export const addLocation = postData => dispatch => {
  dispatch(clearErrors());
  Axios.post("/api/dashboard/createLocation", postData)
    .then(res => dispatch({ type: ADD_LOCATION, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//GET POSTS
export const getLocation = postData => dispatch => {
  Axios.post(`/api/dashboard/`, postData)
    .then(res => {
      dispatch({
        type: GET_LOCATION,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//GET SINGLE LOCATION
export const setSingleLocation = id => dispatch => {
  Axios.get(`/api/dashboard/${id}`)
    .then(res =>
      dispatch({
        type: GET_SINGLE_LOCATION,
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

//GET SINGLE LOCATION
export const getTopLocations = () => dispatch => {
  Axios.get(`/api/dashboard`)
    .then(res =>
      dispatch({
        type: GET_TOP_LOCATIONS,
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
