// moviecard.e2e.test.js
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Moviecard from './moviecard.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const filmInfo = {
  id: 0,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

const onMovieTitleClick = jest.fn();
const onMovieCardActivate = jest.fn();
const onMovieCardOut = jest.fn();

describe(`Moviecard e2e tests`, () => {
  it(`Should moviecard be mouse over`, () => {
    const movieCard = shallow(
        <Moviecard
          movie={filmInfo}
          onMovieCardActivate={onMovieCardActivate}
          onMovieCardOut={onMovieCardOut}
          onMovieTitleClick={onMovieTitleClick}
        />
    );
    const poster = movieCard.find(`.small-movie-card__image`);
    poster.simulate(`mouseover`);
    expect(onMovieCardActivate.mock.calls.length).toBe(1);
    poster.simulate(`mouseout`);
    expect(onMovieCardOut.mock.calls.length).toBe(1);
  });
});
