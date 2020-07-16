// error.test.js
import {reducer, ActionType, ActionCreator} from './error.js';

describe(`Error reducer tests`, () => {
  it(`Reducer without paramters should return initialState`, () => {
    expect(reducer(void 0, {})).toEqual({
      message: ``,
      show: false,
    });
  });
  it(`Reducer should set new error message`, () => {
    const errorMessage = `Error message`;
    expect(reducer({
      message: ``,
      show: false,
    }, {
      type: ActionType.SET_ERROR_MESSAGE,
      payload: errorMessage,
    })).toEqual({
      message: errorMessage,
      show: false,
    });
  });
  it(`Reducer should set new error show status`, () => {
    const errorMessage = `Error message`;
    expect(reducer({
      message: errorMessage,
      show: false,
    }, {
      type: ActionType.SHOW_ERROR_MESSAGE,
      payload: true,
    })).toEqual({
      message: errorMessage,
      show: true,
    });
  });
  it(`Should set error message`, () => {
    const errorMessage = `Error message`;
    expect(ActionCreator.setErrMessage(errorMessage)).toEqual({
      type: ActionType.SET_ERROR_MESSAGE,
      payload: errorMessage,
    });
  });
  it(`Should set error show status`, () => {
    const showStatus = true;
    expect(ActionCreator.showErrMessage(showStatus)).toEqual({
      type: ActionType.SHOW_ERROR_MESSAGE,
      payload: showStatus,
    });
  });
});

