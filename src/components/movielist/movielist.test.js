// movielist.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Movielist from '../movielist/movielist.jsx';

const filmsInfo = [
  {
    id: 0,
    title: `Joker`,
    poster: `img/joker.jpg`,
    altPoster: `Joker poster`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 1,
    title: `The Commuter`,
    poster: `img/commuter.jpg`,
    altPoster: `Commuter poster`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
  {
    id: 2,
    title: `Molly's Game`,
    poster: `img/mollys-game.jpg`,
    altPoster: `Game poster`,
    src: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
    preview: `https://media.w3.org/2010/05/sintel/trailer.mp4`,
  },
];

const onMovieTitleClickHandler = jest.fn();

describe(`Movielist tests`, () => {
  it(`Movielist should render several moviecards`, () => {
    const tree = renderer
    .create(
        <Movielist
          filmsInfo={filmsInfo}
          onMovieTitleClick={onMovieTitleClickHandler}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
