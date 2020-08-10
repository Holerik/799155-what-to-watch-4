// tabs.e2e.test.js
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tabs from './tabs.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const tabItems = [`All genres`, `Dramas`, `Crime`];

describe(`Tabs e2e tests`, () => {
  it(`Should be response when clicked`, () => {
    const onMouseClick = jest.fn();
    const onMouseOver = jest.fn();
    const wrapper = mount(
        <Tabs
          activeItem={0}
          listItems={tabItems}
          mouseClickHandler={onMouseClick}
          mouseOverHandler={onMouseOver}
        />
    );
    const tablist = wrapper.find(`.movie-nav__list`);
    tablist.simulate(`click`);
    expect(onMouseClick.mock.calls.length).toBe(1);
  });
});
