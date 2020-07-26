// footer.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Rating from './rating.jsx';


it(`<Rating /> should render correctly`, () => {
  const tree = renderer
    .create(<Rating
      index={0}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
