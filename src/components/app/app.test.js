// app.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

const promoMovie = {
  genre: `Drama`,
  year: 2014,
};

const movieTitles = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`
];

describe(`App tests`, () => {
  it(`App should render main screen`, () => {
    const tree = renderer
    .create(
        <App
          promoMovie={promoMovie}
          movieTitles={movieTitles}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
