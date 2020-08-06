// add-review.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import AddComments from './add-comments.jsx';

const mockReview = {
  id: 1,
  authorId: 1,
  author: ``,
  rating: `0`,
  date: `2020-07-24T14:16:23.037Z`,
  text: ``,
};

describe(`AddComments test`, () => {
  it(`<AddComments /> should render correctly`, () => {
    const tree = renderer
      .create(<AddComments
        comments={[mockReview]}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
