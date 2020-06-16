// movielist.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Movielist from '../movielist/movielist.jsx';

const movieTitles = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`
];

const onMovieTitleClickHandler = jest.fn();

describe(`Movielist tests`, () => {
  it(`Movielist should render several moviecards`, () => {
    const tree = renderer
    .create(
        <Movielist
          titles={movieTitles}
          onMovieTitleClickHandler={onMovieTitleClickHandler}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
