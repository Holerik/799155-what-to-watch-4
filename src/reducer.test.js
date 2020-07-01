// reducer.test.js
import {reducer, ActionType, ActionCreator, ALL_GENRES} from './reducer.js';
import {filmsInfo, promoMovie} from './mocks/films.js';

describe(`Reducer tests`, () => {
  it(`Reducer without paramters should return initialState`, () => {
    expect(reducer(void 0, {})).toEqual({
      movies: filmsInfo,
      promo: promoMovie,
      page: 0,
      movie: undefined,
      genre: ALL_GENRES,
    });
  });

  it(`Reducer should set new page`, () => {
    expect(reducer({
      movies: [],
      promo: undefined,
      page: 0,
      movie: undefined,
      genre: ALL_GENRES,
    }, {
      type: ActionType.SET_PAGE,
      payload: 1,
    })).toEqual({
      movies: [],
      promo: undefined,
      page: 1,
      movie: undefined,
      genre: ALL_GENRES,
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
