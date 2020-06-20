// moviecard.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Moviecard from '../moviecard/moviecard.jsx';

const filmInfo = {
  id: 1,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

describe(`Moviecard tests`, () => {
  it(`Moviecard should render poster`, () => {
    const onMovieTitleClick = jest.fn();
    const onMovieCardActivate = jest.fn();
    const onMovieCardOut = jest.fn();
    const tree = renderer
    .create(
        <Moviecard
          movie={filmInfo}
          onMovieCardActivate={onMovieCardActivate}
          onMovieCardOut={onMovieCardOut}
          onMovieTitleClick={onMovieTitleClick}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

