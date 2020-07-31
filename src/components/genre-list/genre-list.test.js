// genre-list.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import GenreList from './genre-list.jsx';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import history from '../../history.js';
import {Router} from 'react-router-dom';

const mockStore = configureStore([]);

it(`GenreList should render genres list correctly`, () => {
  const genresList = [`All genres`, `Drama`, `Crime`, `Biography`, `Thriller`, `Action`, `Mystery`];
  const store = mockStore({
    DATA: {
      genresList,
    },
    ERROR: {
      message: ``,
      show: false,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <GenreList
              activeItem={0}
              currentActiveItem={0}
              listItems={genresList}
              onMouseOver={() => {}}
              onMouseClick={() => {}}
              maxItemsCount={genresList.length}
            />
          </Router>
        </Provider>
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
