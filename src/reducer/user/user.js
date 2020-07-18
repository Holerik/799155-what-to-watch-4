// user.js
import {extend} from '../../utils.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_AUTHOR_INFORMATION: `SET_AUTHOR_INFORMATION`,
};

const initilalState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorId: -1,
  authorName: ``,
  authorEmail: ``,
  avatar: `img/avatar.jpg`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setAuthorInfo: (info) => {
    return {
      type: ActionType.SET_AUTHOR_INFORMATION,
      payload: info,
    };
  },
};

const reducer = (state = initilalState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_AUTHOR_INFORMATION:
      return extend(state, {
        authorId: action.payload.id,
        authorName: action.payload.name,
        authorEmail: action.payload.email,
        avatar: action.payload.avatar_url,
      });
  }
  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
    .then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    });
  },
};


export {reducer, Operation, ActionType, ActionCreator, AuthorizationStatus};
