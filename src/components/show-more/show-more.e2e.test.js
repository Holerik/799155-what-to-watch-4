// show-more.e2e.test.js
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ShowMore} from './show-more.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`ShowMore e2e tests`, () => {
  it(`Should check <Show more> button was clicked`, () => {
    const showMoreClickHandler = jest.fn();
    const main = mount(
        <ShowMore
          cardsCount={16}
          lastCard={0}
          showMoreClickHandler={showMoreClickHandler}
        />
    );
    const button = main.find(`button.catalog__button`);
    button.simulate(`click`);
    expect(showMoreClickHandler.mock.calls.length).toBe(1);
  });
});
