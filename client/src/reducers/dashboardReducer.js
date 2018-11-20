import {
  ADD_LOCATION,
  GET_LOCATION,
  LOADING_LOCATIONS,
  GET_SINGLE_LOCATION
} from "../actions/types";

const initialState = {
  locations: [],
  location: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_LOCATIONS:
      return {
        ...state,
        loading: true
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [action.payload, ...state.locations]
      };
    case GET_LOCATION:
      return {
        ...state,
        locations: action.payload,
        loading: false
      };
    case GET_SINGLE_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    default:
      return state;
  }
}
