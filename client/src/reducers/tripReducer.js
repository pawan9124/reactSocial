import { ADD_TRIP, LOADING_TRIP, GET_TRIPS, GET_TRIP } from "../actions/types";

const initialState = {
  trips: [],
  trip: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_TRIP:
      return { ...state, loading: true };
    case ADD_TRIP:
      return { ...state, trips: [action.payload, ...state.trips] };
    case GET_TRIPS:
      return { ...state, trips: action.payload, loading: false };
    case GET_TRIP:
      return { ...state, trip: action.payload };
    default:
      return state;
  }
}
