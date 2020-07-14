// selectors.js
import NameSpace from '../name-space/name-space.js';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getAuthorInfo = (state) => {
  return {
    avatar: state[NAME_SPACE].avatar,
    name: state[NAME_SPACE].authorName,
  };
};
