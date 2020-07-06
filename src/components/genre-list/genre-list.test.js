// genre-list.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list.jsx';

it(`GenreList should render genres list correctly`, () => {
  const genresList = [`All genres`, `Drama`, `Crime`, `Biography`, `Thriller`, `Action`, `Mystery`];
  const tree = renderer
    .create(
        <GenreList
          activeItem={0}
          currentActiveItem={0}
          listItems={genresList}
          onMouseOver={() => {}}
          onMouseClick={() => {}}
          maxItemsCount={genresList.length}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
