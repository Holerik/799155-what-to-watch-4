// controls.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {Controls} from './controls.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import history from '../../history.js';
import {Router} from 'react-router-dom';

const film = {
  id: 1,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  background: `img/joker-bg.jpg`,
  altBackground: `Gotham City`,
  genre: [`Thriller`],
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
  starring: [`Joaquin Phoenix`],
  description: ``,
  review: ``,
  reviews: [0],
  favorite: false,
};

const mockStore = configureStore([]);

describe(`Controls test`, () => {
  it(`<Controls /> should render correctly`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
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
            <Controls
              favoriteButtonClickHandler= {() => {}}
              movieInfo={film}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
            />
          </Router>
        </Provider>
        , {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
