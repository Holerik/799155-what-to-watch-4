// moviecard.e2e.test.js
import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Moviecard from './moviecard.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const filmInfo = {
  id: 1,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  background: `img/joker-bg.jpg`,
  altBackground: `Gotham City`,
  genre: [`Thriller`, `Crime`, `Drama`],
  year: 2019,
  duration: `2h 2min`,
  age: `18+`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

describe(`Moviecard e2e tests`, () => {
  it(`Should moviecard be mouse over`, () => {
    const onMovieTitleClick = jest.fn();
    const onMovieCardActivate = jest.fn();
    const onMovieCardOut = jest.fn();

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
    const title = movieCard.find(`.small-movie-card__link`);
    title.simulate(`click`);
    expect(onMovieTitleClick.mock.calls.length).toBe(1);
  });
});
