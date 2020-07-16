// selectors.js
import NameSpace from '../name-space/name-space.js';

const NAME_SPACE = NameSpace.ERROR;

export const getErrMessage = (state) => {
  return state[NAME_SPACE].message;
};

export const getErrShowStatus = (state) => {
  return state[NAME_SPACE].show;
};
