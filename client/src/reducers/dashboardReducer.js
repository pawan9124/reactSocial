import {
  ADD_LOCATION,
  GET_LOCATIONS,
  LOADING_LOCATIONS
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
        posts: [action.payload, ...state.locations]
      };
    case GET_LOCATIONS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
