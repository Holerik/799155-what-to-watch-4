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
  rating: {
    score: `4.3`,
    level: `very good`,
    count: 150,
  },
  director: `Todd Phillips`,
  starring: [`Joaquin Phoenix`, `Zazie Beetz`, `Robert De Niro`, `Bryan Callen`, `Shea Whigham`, `Frances Conroy`, `Glenn Fleshler`, `Brett Cullen`, `Marc Maron`],
  description: `The origin tale of the Joker (Joaquin Phoenix) – one of the most iconic villains in comic book history.`,
  review: `Arthur Fleck (Joaquin Phoenix) isn’t happy with his life. He struggles to make money as a part-time clown while sharing a rundown apartment with his ailing mom (Frances Conroy). But Arthur lives in a city struck by hard times where a decent, honest living is difficult to come by. He also suffers from a condition that causes him to break into uncontrollable laughter. None of this stops Arthur from dreaming big. He aspires to be a stand-up comedian and attempts to write jokes in his diary. Caught in between it all, Arthur slowly begins to lose his grip on sanity`,
};

describe(`Moviecard e2e tests`, () => {
  it(`Should moviecard be mouse over`, () => {
    const onMovieTitleClick = jest.fn();
    const onMovieCardActivate = jest.fn();
    const onMovieCardOut = jest.fn();
    let canPlayVideo = false;
    let activeMovieId = -1;

    const movieCard = shallow(
        <Moviecard
          movie={filmInfo}
          movieCardActivateHandler={onMovieCardActivate}
          movieCardOutHandler={onMovieCardOut}
          movieTitleClickHandler={onMovieTitleClick}
          canPlayVideo={canPlayVideo}
          activeMovieId={activeMovieId}
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
