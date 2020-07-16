// sign-in.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from './sign-in.jsx';

const mockStore = configureStore([]);

describe(`SignIn test`, () => {
  it(`SignIn component should render correctly`, () => {
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
          <SignIn
            onSubmit={() => {}}
          />)
        </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
