// moviecard.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Moviecard from './moviecard.jsx';

const filmInfo = {
  id: 1,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  background: `img/joker-bg.jpg`,
  altBackground: `Gotham City`,
  genre: [`Thriller`, `Crime`, `Drama`],
  year: 2019,
  duration: `2h 2min`,
  age: `18+`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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

