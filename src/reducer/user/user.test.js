// user.test.js
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, ActionCreator, Operation} from './user.js';
import {SERVER_ADRESS_PREFIX} from '../../const.js';

const api = createAPI(() => {});

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const mockInfo = {
  id: 1,
  name: `Ivan`,
  email: `ivan@mail.com`,
  [`avatar_url`]: `/wtw/static/img/1.img`,
};

describe(`User reducer tests`, () => {
  it(`Reducer without paramters should return initialState`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorId: -1,
      authorName: ``,
      authorEmail: ``,
      avatar: `img/avatar.jpg`,
    });
  });
  it(`Reducer should set authorization require`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorId: -1,
      authorName: ``,
      authorEmail: ``,
      avatar: `img/avatar.jpg`,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
      authorId: -1,
      authorName: ``,
      authorEmail: ``,
      avatar: `img/avatar.jpg`,
    });
  });
  it(`Reducer should set new author information`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorId: -1,
      authorName: ``,
      authorEmail: ``,
      avatar: `img/avatar.jpg`,
    }, {
      type: ActionType.SET_AUTHOR_INFORMATION,
      payload: {
        id: 1,
        name: `Ivan`,
        email: `ivan@mail.com`,
        [`avatar_url`]: `/img/hero.jpg`,
      },
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authorId: 1,
      authorName: `Ivan`,
      authorEmail: `ivan@mail.com`,
      avatar: SERVER_ADRESS_PREFIX + `/img/hero.jpg`,
    });
  });
  it(`ActionCreator for requiring authorization return correct action`, () => {
    expect(
        ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)
    ).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    });
  });
});

describe(`User Operation tests`, () => {
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
    .onGet(`/login`)
    .reply(200, mockInfo);

    return checkAuth(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(
          1,
          ActionCreator.setAuthorInfo(mockInfo)
      );
      expect(dispatch).toHaveBeenNthCalledWith(
          2,
          ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)
      );
    });
  });
  it(`login should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login({});

    apiMock.onPost(`/login`).reply(200);

    return login(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(
          1,
          ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)
      );
    });
  });
});
