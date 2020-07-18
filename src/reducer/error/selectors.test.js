// selectors.test.js
import {getErrMessage, getErrShowStatus} from './selectors.js';

describe(`Error selectors tests`, () => {
  it(`getErrMessage should return error message`, () => {
    const errorMessage = `Error message`;
    expect(getErrMessage({ERROR: {message: errorMessage}})).toEqual(errorMessage);
  });
  it(`getErrMessage should return error show status`, () => {
    const status = true;
    expect(getErrShowStatus({ERROR: {show: status}})).toEqual(status);
  });
});
