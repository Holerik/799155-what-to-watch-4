// tabs.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';

const tabItems = [`All genres`, `Dramas`, `Crime`];

it(`Tabs should render correctly`, () => {
  const setActiveItem = jest.fn();
  const tree = renderer
    .create(
        <Tabs
          activeItem={0}
          setActiveItem={setActiveItem}
          tabItems={tabItems}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
