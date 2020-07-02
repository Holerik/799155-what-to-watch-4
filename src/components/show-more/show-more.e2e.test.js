// show-more.e2e.test.js
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShowMore from './show-more.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should check <Show more> button was clicked`, () => {
  const showMoreClickHandler = jest.fn();
  const main = mount(
      <ShowMore
        filmsCount={7}
        setShowLimits={showMoreClickHandler}
      />
  );
  const button = main.find(`button.catalog__button`);
  button.props().onClick();
  expect(showMoreClickHandler.mock.calls.length).toBe(1);
});
