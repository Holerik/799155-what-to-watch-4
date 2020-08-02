// header.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './header.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import history from '../../history.js';
import {Router} from 'react-router-dom';

const mockStore = configureStore([]);

describe(`Header test`, () => {
  it(`<Header /> should render correctly`, () => {
    const store = mockStore({
      USER: {
        avatar: `img/avatar.jpg`,
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
              <Header
                avatar={`img/avatar.jpg`}
                setPage={() => {}}
                setMovie={() => {}}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                errMessage={``}
                showErrMessage={false}
              />
            </Router>
          </Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
