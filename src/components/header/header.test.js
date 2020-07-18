// header.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './header.jsx';
import {AuthorizationStatus} from '../../reducer/user/user.js';

describe(`Header tests`, () => {
  it(`<Header /> should render correctly`, () => {
    const tree = renderer
      .create(<Header
        avatar={`img/avatar.jpg`}
        setPage={() => {}}
        setMovie={() => {}}
        authorizationStatus={AuthorizationStatus.NO_AUTH}
        errMessage={``}
        showErrMessage={false}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
