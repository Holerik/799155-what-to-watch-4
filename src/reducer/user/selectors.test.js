// selectors.test.js
import {getAuthorizationStatus, getAuthorInfo} from './selectors.js';

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

describe(`User selectors tests`, () => {
  it(`getAuthorInfo should return author info`, () => {
    const author = {
      authorName: `Ivan`,
      avatar: `img/avatar.jpg`,
      authorId: 1,
      authorEmail: `user@mail.com`,
    };
    const authorInfo = {
      name: author.authorName,
      avatar: author.avatar,
    };
    expect(getAuthorInfo({USER: author})).toEqual(authorInfo);
  });

  const status = AuthorizationStatus.NO_AUTH;

  it(`getAuthorizationStatus should return authorization status`, () => {
    expect(getAuthorizationStatus({USER: {authorizationStatus: status}})).toEqual(status);
  });
});
