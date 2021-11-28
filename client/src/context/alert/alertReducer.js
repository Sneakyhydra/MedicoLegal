import * as actions from '../types';

// Change state according to the type of action
const alertReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_ALERT:
      return [...state, action.payload];

    case actions.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);

    default:
      return state;
  }
};

export default alertReducer;
