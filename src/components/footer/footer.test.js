// footer.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import {Footer} from './footer.jsx';

it(`<Footer /> should render correctly`, () => {
  const tree = renderer
    .create(<Footer
      setPage={() => {}}
      setMovie={() => {}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
