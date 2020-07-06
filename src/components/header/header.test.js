// header.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {Header} from './header.jsx';

it(`<Header /> should render correctly`, () => {
  const tree = renderer
    .create(<Header
      avatar={`img/avatar.jpg`}
      setPage={() => {}}
      setMovie={() => {}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
