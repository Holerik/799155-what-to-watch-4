// selectors.js
import NameSpace from '../name-space/name-space.js';

const NAME_SPACE = NameSpace.MOVIE;

export const getMovie = (state) => {
  return state[NAME_SPACE].movie;
};

export const getPage = (state) => {
  return state[NAME_SPACE].page;
};

export const getPlayState = (state) => {
  return state[NAME_SPACE].play;
};

export const getFirstCardNumber = (state) => {
  return state[NAME_SPACE].firstCard;
};

export const getLastCardNumber = (state) => {
  return state[NAME_SPACE].lastCard;
};
