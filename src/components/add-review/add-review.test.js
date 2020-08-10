// add-review.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import AddReview from './add-review.jsx';

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
  src: ``,
  preview: ``,
  rating: {
    score: `4.3`,
    level: `very good`,
    count: 150,
  },
  director: `Todd Phillips`,
  starring: [`Joaquin Phoenix`, `Zazie Beetz`],
  description: `The origin tale of the Joker (Joaquin Phoenix)`,
  review: `Arthur Fleck (Joaquin Phoenix) isn’t happy with his life.`,
  reviews: [],
  favorite: false,
};

describe(`Addreview test`, () => {
  it(`<AddReview /> should render correctly`, () => {
    const tree = renderer
    .create(<AddReview
      movieInfo={movie}
      avatar={`img/avatar.jpg`}
      setPage={() => {}}
      setMovie={() => {}}
      onSubmit={() => {}}
      onChangeLength={() => {}}
      textLength={0}
      loadStatus={false}
    />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
