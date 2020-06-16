// main.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../main/main.jsx';

const promoMovie = {
  genre: `Drama`,
  year: 2014,
};

const movieTitles = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`
];

const onMovieTitleClickHandler = jest.fn();

describe(`Main tests`, () => {
  it(`Main should render the screen`, () => {
    const tree = renderer
    .create(
        <Main
          promoMovie={promoMovie}
          movieTitles={movieTitles}
          onMovieTitleClickHandler={onMovieTitleClickHandler}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
