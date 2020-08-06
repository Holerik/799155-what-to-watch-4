// not-found.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NotFound from './not-found.jsx';
import history from '../../history.js';
import {Router} from 'react-router-dom';

const mockStore = configureStore([]);

describe(`NotFound test`, () => {
  it(`NotFound component should render correctly`, () => {
    const store = mockStore({
      ERROR: {
        message: ``,
        show: false,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <NotFound/>
          </Router>
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
