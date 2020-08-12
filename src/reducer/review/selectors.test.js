// selectors.test.js
import {getReviews, getLoadStatus, getSubmitBlock} from './selectors.js';

describe(`Review selectors tests`, () => {
  it(`getReviews should return reviews`, () => {
    const comments = [
      {
        id: 1,
        authorId: 1,
        author: `Boris`,
        rating: `10`,
        date: `Sun Mar 15 2020`,
        text: `Some review comment`,
      }
    ];
    expect(getReviews({REVIEW: {reviews: comments}})).toEqual(comments);
  });
  it(`getLoadStatus should return load status`, () => {
    expect(getLoadStatus({REVIEW: {loadStatus: true}})).toEqual(true);
  });
  it(`getSubmitBlock should return block status`, () => {
    expect(getSubmitBlock({REVIEW: {submitIsBlocked: false}})).toEqual(false);
  });
});
