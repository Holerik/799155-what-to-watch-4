// selectors.js
import NameSpace from '../name-space/name-space.js';

const NAME_SPACE = NameSpace.REVIEW;

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getLoadStatus = (state) => {
  return state[NAME_SPACE].loadStatus;
};

export const getSubmitBlock = (state) => {
  return state[NAME_SPACE].submitIsBlocked;
};
