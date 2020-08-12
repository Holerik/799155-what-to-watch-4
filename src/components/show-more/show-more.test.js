// show-more.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {ShowMore} from './show-more.jsx';
import {ShowMode} from '../../reducer/data/data.js';

describe(`ShowMore tests`, () => {
  it(`<ShowMore /> should render correctly`, () => {
    const tree = renderer
    .create(<ShowMore
      cardsCount={16}
      favoritesCount={0}
      lastCard={0}
      showMoreButtonClickHandler={() => {}}
      showMode={ShowMode.GENRE_MODE}
    />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
