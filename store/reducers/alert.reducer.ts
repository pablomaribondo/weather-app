import { AlertState, AlertAction, SET_ALERT } from '../types';

const INITIAL_STATE: AlertState = {
  message: ''
};

// eslint-disable-next-line default-param-last
export default (state = INITIAL_STATE, action: AlertAction): AlertState => {
  switch (action.type) {
    case SET_ALERT:
      return {
        message: action.payload
      };

    default:
      return state;
  }
};
