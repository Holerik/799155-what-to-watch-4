// reducer.test.js
import {reducer, ActionType, ActionCreator, ALL_GENRES} from './reducer.js';
import {filmsInfo, promoMovie} from './mocks/films.js';

const MOVIE_CARDS_ON_PAGE = 8;

describe(`Reducer tests`, () => {
  it(`Reducer without paramters should return initialState`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies: filmsInfo,
      promo: promoMovie,
      page: 0,
      movie: undefined,
      genre: ALL_GENRES,
      firstCard: 0,
      lastCard: filmsInfo.length > MOVIE_CARDS_ON_PAGE ?
        MOVIE_CARDS_ON_PAGE - 1 : filmsInfo.length - 1,
      cardsCount: filmsInfo.length,
    });
  });

  it(`Reducer should set new page`, () => {
    expect(reducer({
      movies: [],
      promo: undefined,
      page: 0,
      movie: undefined,
      genre: ALL_GENRES,
      firstCard: 0,
      lastCard: 7,
      cardsCount: filmsInfo.length,
    }, {
      type: ActionType.SET_PAGE,
      payload: 1,
    })).toEqual({
      movies: [],
      promo: undefined,
      page: 1,
      movie: undefined,
      genre: ALL_GENRES,
      firstCard: 0,
      lastCard: 7,
      cardsCount: filmsInfo.length,
    });
  });
});

describe(`ActionCreator work correctly`, () => {
  it(`ActionCreator for set page returns correct action`, () => {
    expect(ActionCreator.setPage(1)).toEqual({
      type: ActionType.SET_PAGE,
      payload: 1,
    });
  });
});
