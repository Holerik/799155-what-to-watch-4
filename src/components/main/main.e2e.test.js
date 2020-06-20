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

const filmsInfo = [
  {
    id: 1,
    title: `Joker`,
    poster: `img/joker.jpg`,
    altPoster: `Joker poster`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    title: `The Commuter`,
    poster: `img/commuter.jpg`,
    altPoster: `Commuter poster`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
  {
    id: 3,
    title: `Molly's Game`,
    poster: `img/mollys-game.jpg`,
    altPoster: `Game poster`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
];

describe(`Main e2e tests`, () => {
  it(`Should movie card title be clicked`, () =>{
    const onMovieTitleClickHandler = jest.fn();
    const mainScreen = mount(
        <Main
          promoMovie={promoMovie}
          filmsInfo={filmsInfo}
          onMovieTitleClick={onMovieTitleClickHandler}
        />
    );
    const titles = mainScreen.find(`.small-movie-card__link`);
    expect(titles).toHaveLength(filmsInfo.length);
    titles.at(0).simulate(`click`);
    expect(onMovieTitleClickHandler.mock.calls.length).toBe(1);
  });
});
