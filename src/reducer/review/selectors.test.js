// selectors.test.js
import {getReviews} from './selectors.js';

describe(`Review selectors tests`, () => {
  it(`getRevies should return reviews`, () => {
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
});
