// moviecard.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Moviecard from '../moviecard/moviecard.jsx';

const title = `Terminator`;
const onMovieTitleClickHandler = jest.fn();

describe(`Moviecard tests`, () => {
  it(`Moviecard should render poster`, () => {
    const tree = renderer
    .create(
        <Moviecard
          title={title}
          onTitleClickHandler={onMovieTitleClickHandler}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

