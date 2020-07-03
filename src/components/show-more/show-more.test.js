// show-more.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {ShowMore} from './show-more.jsx';

describe(`ShowMore tests`, () => {
  it(`<ShowMore /> should render correctly`, () => {
    const tree = renderer
    .create(<ShowMore
      cardsCount={16}
      lastCard={0}
      showMoreClickHandler={() => {}}
    />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
