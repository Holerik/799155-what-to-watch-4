// data.test.js
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {ActionType, Operation, getMovieObject, mockMovie, reducer} from './data.js';
import {ALL_GENRES} from '../../const.js';

const api = createAPI(() => {});

const films = [
  {
    [`background_color`]: `#929FA5`,
    [`background_image`]: `Bohemian_Rhapsody.jpg`,
    description: `Bohemian Rhapsody is a foot-stomping celebration of Queen`,
    director: `Bryan Singer`,
    genre: `Drama`,
    id: 1,
    [`is_favorite`]: false,
    name: `Bohemian Rhapsody`,
    [`poster_image`]: `Bohemian_Rhapsody.jpg`,
    [`preview_image`]: `bohemian_rhapsody.jpg`,
    [`preview_video_link`]: `video link 1`,
    rating: 6.1,
    released: 2018,
    [`run_time`]: 134,
    [`scores_count`]: 338903,
    starring: [`Rami Malek`, `Lucy Boynton`, `Gwilym Lee`],
  },
];

const promoFilm = {
  id: 2,
  title: `Joker`,
  poster: `img/joker.jpg`,
  altPoster: `Joker poster`,
  background: `img/joker-bg.jpg`,
  altBackground: `Gotham City`,
  genre: [`Thriller`, `Crime`, `Drama`],
  year: 2019,
  duration: `2h 2min`,
  age: `18+`,
  src: `video link 2`,
  preview: `video link 2`,
  rating: {
    score: `8.1`,
    level: `very good`,
    count: 950,
  },
  director: `Wes Anderson`,
  starring: [`Ralph Fiennes`, `F. Murray Abraham`],
  description: `Wes Anderson's THE GRAND BUDAPEST HOTEL recounts the adventures of Gustave H`,
  review: `GRAND BUDAPEST HOTEL recounts the adventures of Gustave H`,
  favorite: 0,
};

const movies = [
  getMovieObject(films[0]),
];

describe(`Data operation tests`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
    .onGet(`/films`)
    .reply(200, films);

    return moviesLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(5);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_MOVIES,
        payload: movies,
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_GENRES_LIST,
        payload: [`All genres`, `${films[0].genre}`],
      });
      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_CURRENT_GENRE,
        payload: `All genres`,
      });
      expect(dispatch).toHaveBeenNthCalledWith(4, {
        type: ActionType.SET_CARDS_COUNT,
        payload: 1,
      });
      expect(dispatch).toHaveBeenNthCalledWith(5, {
        type: ActionType.SET_FAVORITES_COUNT,
        payload: 0,
      });
    });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = Operation.loadPromoMovie();

    apiMock
    .onGet(`/films/promo`)
    .reply(200, films[0]);

    return promoLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_PROMO_MOVIE,
        payload: movies[0],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.CHANGE_FAVORITES_COUNT,
        payload: false,
      });
    });
  });
});


describe(`Data reducer tests`, () => {
  it(`Reducer without paramters should return initialState`, () => {
    expect(reducer(void 0, {})).toEqual({
      moviesList: [mockMovie],
      promo: mockMovie,
      genre: ALL_GENRES,
      genresList: [ALL_GENRES],
      cardsCount: 0,
      favoritesCount: 0,
    });
  });
  it(`Reducer should set genres list`, () => {
    const genresList = [`All genres`];
    expect(reducer({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    }, {
      type: ActionType.SET_GENRES_LIST,
      payload: genresList,
    })).toEqual({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList,
      cardsCount: 0,
      favoritesCount: 0,
    });
  });
  it(`Reducer should set current genre`, () => {
    const currGenre = `All genres`;
    expect(reducer({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    }, {
      type: ActionType.SET_CURRENT_GENRE,
      payload: currGenre,
    })).toEqual({
      moviesList: [],
      promo: undefined,
      genre: currGenre,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    });
  });
  it(`Reducer should set promo movie`, () => {
    expect(reducer({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    }, {
      type: ActionType.SET_PROMO_MOVIE,
      payload: promoFilm,
    })).toEqual({
      moviesList: [],
      promo: promoFilm,
      genre: ``,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    });
  });
  it(`Reducer should set moviesList`, () => {
    expect(reducer({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    })).toEqual({
      moviesList: movies,
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    });
  });
  it(`Reducer should set cards count`, () => {
    expect(reducer({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 0,
      favoritesCount: 0,
    }, {
      type: ActionType.SET_CARDS_COUNT,
      payload: 2,
    })).toEqual({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 2,
      favoritesCount: 0,
    });
  });
  it(`Reducer should change favorite status`, () => {
    expect(reducer({
      moviesList: [],
      promo: undefined,
      genre: ``,
      genresList: [],
      cardsCount: 2,
      favoritesCount: 0,
    }, {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: {
        promoMovie: promoFilm,
        allFilms: movies,
        favoritesCount: 1,
      },
    })).toEqual({
      moviesList: movies,
      promo: promoFilm,
      genre: ``,
      genresList: [],
      cardsCount: 2,
      favoritesCount: 1,
    });
  });
});
