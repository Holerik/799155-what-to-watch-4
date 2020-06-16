// main.e2e.test.js
import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const promoMovie = {
  genre: `Drama`,
  year: 2014,
};

const movieTitles = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`
];

describe(`Main e2e tests`, () => {
  it(`Should movie card title be clicked`, () =>{
    const onMovieTitleClickHandler = jest.fn();
    const mainScreen = mount(
        <Main
          promoMovie={promoMovie}
          movieTitles={movieTitles}
          onMovieTitleClickHandler={onMovieTitleClickHandler}
        />
    );
    const titles = mainScreen.find(`.small-movie-card__link`);
    expect(titles).toHaveLength(movieTitles.length);
    titles.at(0).simulate(`click`);
    expect(onMovieTitleClickHandler.mock.calls.length).toBe(1);
  });
});
