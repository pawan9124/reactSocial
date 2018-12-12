import Axios from "axios";
import {
  ADD_TRIP,
  LOADING_TRIP,
  GET_TRIPS,
  GET_TRIP,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

//Add POST
export const addTrip = postData => dispatch => {
  dispatch(clearErrors());
  Axios.post("/api/trip", postData)
    .then(res =>
      dispatch({
        type: ADD_TRIP,
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

//GET POSTS
export const getTrips = () => dispatch => {
  Axios.get(`/api/trip`)
    .then(res => {
      dispatch({
        type: GET_TRIPS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Errr", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//GET POSTS
export const getSearchedTrips = postData => dispatch => {
  Axios.post(`/api/trip/search`, postData)
    .then(res => {
      dispatch({
        type: GET_TRIPS,
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
export const setSingleTrip = id => dispatch => {
  Axios.get(`/api/trip/${id}`)
    .then(res =>
      dispatch({
        type: GET_TRIP,
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
    type: LOADING_TRIP
  };
};

//create post loading
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
