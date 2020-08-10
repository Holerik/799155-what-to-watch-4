// tabs.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';

const tabItems = [`All genres`, `Dramas`, `Crime`];

it(`Tabs should render correctly`, () => {
  const tree = renderer
    .create(
        <Tabs
          activeItem={0}
          listItems={tabItems}
          mouseClickHandler={() => {}}
          mouseOverHandler={() => {}}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
