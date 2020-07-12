// movie.test.js
import {reducer, ActionType} from './movie.js';

const MOVIE_CARDS_ON_PAGE = 8;

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
      movie: undefined,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    }, {
      type: ActionType.SET_PAGE,
      payload: 1,
    })).toEqual({
      page: 1,
      movie: undefined,
      firstCard: 0,
      lastCard: MOVIE_CARDS_ON_PAGE,
      play: false,
    });
  });
});
