import {
  /* we need our action types here*/
  FETCHING,
  FETCHED,
  ERROR
} from "../actions";
const initialState = {
  // define a few properties here.
  // Array chars, Boolean fetching, Boolean fetched, null error.
  chars: [],
  fetching: false,
  fetched: false,
  error: null
};
export const charsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fill me in with the important reducers
    // action types should be FETCHING, FETCHED, and ERROR
    // your switch statement should handle all of these cases.
    case FETCHING:
      return Object.assign({}, state, {
        fetching: true
        // fetched: false,
        // error: null
      });
    case FETCHED:
      return Object.assign({}, state, {
        chars: action.payload,
        fetching: false,
        fetched: true
        // error: null
      });
    case ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: false,
        error: action.payload
      });
    default:
      return state;
  }
};
