// starrig-list.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import StarringList from './starring-list.jsx';

const starring = [`Jessica Chastain`, `Idris Elba`, `Kevin Costner`];

it(`StarringList should render correctly`, () => {
  const tree = renderer
    .create(
        <StarringList
          stars={starring}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
