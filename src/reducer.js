// reducer.js
import {filmsInfo, promoMovie} from './mocks/films.js';
import {extend} from './utils.js';

export const ALL_GENRES = `All genres`;

export const ActionType = {
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SET_CURRENT_GENRE: `SET_CURRENT_GENRE`,
  SET_MOVIE: `SET_MOVIE`,
  SET_PROMO: `SET_PROMO`,
  SET_PAGE: `SET_PAGE`,
};

export const selectMoviesByGenre = (genre) => {
  let movies = filmsInfo;
  if (genre !== undefined && genre !== ALL_GENRES) {
    movies = filmsInfo.filter((movie) => {
      return movie.genre.includes(genre);
    });
  }
  return movies;
};

export const getPromo = () => {
  return promoMovie;
};

const initialState = {
  // список карточек фильмов с короткой информацией
  movies: filmsInfo,
  // промо фильм
  promo: promoMovie,
  // текущая страница
  page: 0,
  // активная карточка
  movie: undefined,
  // текущий жанр
  genre: ALL_GENRES,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        movies: selectMoviesByGenre(action.payload),
      });
    case ActionType.SET_CURRENT_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.SET_MOVIE:
      return extend(state, {
        movie: action.payload,
      });
    case ActionType.SET_PROMO:
      return extend(state, {
        promo: action.payload,
      });
    case ActionType.SET_PAGE:
      return extend(state, {
        page: action.payload,
      });
  }
  return state;
};

export const ActionCreator = {
  getFilmsInfo: (genre) => ({
    type: ActionType.GET_MOVIES_BY_GENRE,
    payload: genre,
  }),
  setCurrentGenre: (genre) => ({
    type: ActionType.SET_CURRENT_GENRE,
    payload: genre,
  }),
  setMovie: (movie) => ({
    type: ActionType.SET_MOVIE,
    payload: movie,
  }),
  setPromo: (movie) => ({
    type: ActionType.SET_PROMO,
    payload: movie,
  }),
  setPage: (page) => ({
    type: ActionType.SET_PAGE,
    payload: page,
  }),
};
