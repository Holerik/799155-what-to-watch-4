// moviecard-details.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import MoviecardDetails from './moviecard-details.jsx';

const movie = {
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

describe(`MoviecardDetails tests`, () => {
  it(`MoviecardDetails should render movie details`, () => {
    const tree = renderer
    .create(
        <MoviecardDetails
          movieInfo={movie}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
