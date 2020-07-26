// review.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Review from './review.jsx';

const mockReview = {
  id: -1,
  authorId: -1,
  author: ``,
  rating: `0`,
  date: `2020-07-24T14:16:23.037Z`,
  text: ``,
};

describe(`Review test`, () => {
  it(`<Review /> should render correctly`, () => {
    const tree = renderer
    .create(<Review
      review={mockReview}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
