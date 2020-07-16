// error.js
import {extend} from '../../utils.js';

const ActionType = {
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
  SHOW_ERROR_MESSAGE: `SHOW_ERROR_MESSAGE`,
};

const initialState = {
  message: ``,
  show: false,
};

const ActionCreator = {
  setErrMessage: (msg) => {
    return {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: msg,
    };
  },
  showErrMessage: (show) => {
    return {
      type: ActionType.SHOW_ERROR_MESSAGE,
      payload: show,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ERROR_MESSAGE:
      return extend(state, {
        message: action.payload,
      });
    case ActionType.SHOW_ERROR_MESSAGE:
      return extend(state, {
        show: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
