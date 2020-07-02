// show-more.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import ShowMore from './show-more.jsx';

it(`<ShowMore /> should render correctly`, () => {
  const showMoreButtonClickHandler = () => {};
  const tree = renderer
    .create(<ShowMore
      filmsCount={2}
      setShowLimits={showMoreButtonClickHandler}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
