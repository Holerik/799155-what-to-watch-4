// tabs.e2e.test.js
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs from './tabs.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const tabItems = [`All genres`, `Dramas`, `Crime`];

describe(`Tabs e2e tests`, () => {
  it(`Should be response when clicked`, () => {
    const setActiveItem = jest.fn();
    const wrapper = shallow(
        <Tabs
          activeItem={0}
          setActiveItem={setActiveItem}
          tabItems={tabItems}
        />
    );
    const tablist = wrapper.find(`.movie-nav__list`);
    tablist.simulate(`click`);
    expect(setActiveItem.mock.calls.length).toBe(1);
  });
});
