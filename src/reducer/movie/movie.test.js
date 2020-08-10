// movie.test.js
import {reducer, ActionType} from './movie.js';
import {MOVIE_CARDS_ON_PAGE} from '../../const.js';

const film =
{
  id: 1,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  background: `img/joker-bg.jpg`,
  altBackground: `Gotham City`,
  genre: [`Thriller`],
  year: 2019,
  duration: `2h 2min`,
  age: `18+`,
  src: `Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  preview: `Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  rating: {
    score: `4.3`,
    level: `very good`,
    count: 150,
  },
  director: `Todd Phillips`,
  starring: [`Joaquin Phoenix`, `Zazie Beetz`],
  description: `The origin tale of the Joker (Joaquin Phoenix)`,
  review: `Arthur Fleck (Joaquin Phoenix) isn’t happy with his life. `,
  favorite: false,
};

describe(`Movie reducer tests`, () => {
  it(`Reducer without paramters should return initialState`, () => {
    expect(reducer(void 0, {})).toEqual({
      page: 0,
      movie: undefined,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    });
  });

  it(`Reducer should set new page`, () => {
    expect(reducer({
      page: 0,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    }, {
      type: ActionType.SET_PAGE,
      payload: 1,
    })).toEqual({
      page: 1,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    });
    expect(reducer({
      page: 0,
      movie: undefined,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    }, {
      type: ActionType.SET_MOVIE,
      payload: film,
    })).toEqual({
      page: 0,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    });
    expect(reducer({
      page: 0,
      movie: undefined,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    }, {
      type: ActionType.SET_FIRST_CARD_NUMBER,
      payload: {maxNumber: 2 * MOVIE_CARDS_ON_PAGE, firstNumber: 3},
    })).toEqual({
      page: 0,
      movie: undefined,
      firstCard: 3,
      lastCard: 10,
      play: false,
    });
    expect(reducer({
      page: 0,
      movie: undefined,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    }, {
      type: ActionType.RESET_MOVIE,
      payload: film,
    })).toEqual({
      page: 0,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    });
    expect(reducer({
      page: 0,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    }, {
      type: ActionType.PLAY_MOVIE,
      payload: film,
    })).toEqual({
      page: 0,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: true,
    });
    expect(reducer({
      page: 0,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: true,
    }, {
      type: ActionType.STOP_MOVIE,
      payload: film,
    })).toEqual({
      page: 0,
      movie: film,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    });
  });
});
