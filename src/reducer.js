// reducer.js
import {filmsInfo, promoMovie} from './mocks/films.js';
import {extend} from './utils.js';

export const ALL_GENRES = `All genres`;
export const MOVIE_CARDS_ON_PAGE = 8;

export const ActionType = {
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  SET_CURRENT_GENRE: `SET_CURRENT_GENRE`,
  SET_MOVIE: `SET_MOVIE`,
  SET_PROMO: `SET_PROMO`,
  SET_PAGE: `SET_PAGE`,
  SET_FIRST_CARD_NUMBER: `SET_FIRST_CARD_NUMBER`,
  SET_CARD_COUNT_TO_SHOW: `SET_CARD_COUNT_TO_SHOW`,
};

const selectMoviesByGenre = (genre) => {
  let movies = filmsInfo;
  if (genre !== undefined && genre !== ALL_GENRES) {
    movies = filmsInfo.filter((movie) => {
      return movie.genre.includes(genre);
    });
  }
  return movies;
};

const createGenresList = (movies) => {
  let genresList = [ALL_GENRES];
  for (const movie of movies) {
    genresList = genresList.concat(movie.genre.filter((item) => {
      return !genresList.includes(item);
    }));
  }
  return genresList;
};

export const getPromo = () => {
  return promoMovie;
};

const initialState = {
  // список карточек фильмов
  movies: filmsInfo,
  // промо фильм
  promo: promoMovie,
  // текущая страница
  page: 0,
  // активная карточка
  movie: undefined,
  // текущий жанр
  genre: ALL_GENRES,
  // список всех жанров
  genresList: createGenresList(filmsInfo),
  // номер первой карточки на странице
  firstCard: 0,
  // номер последней карточки на странице
  lastCard: filmsInfo.length > MOVIE_CARDS_ON_PAGE ?
    MOVIE_CARDS_ON_PAGE - 1 : filmsInfo.length - 1,
  // количество карточек для показа
  cardsCount: filmsInfo.length,
  // картинка аватара
  avatar: `img/avatar.jpg`,
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
    case ActionType.SET_FIRST_CARD_NUMBER:
      const filmsCount = state.movies.length;
      if (action.payload >= filmsInfo) {
        return state;
      }
      const lastNumber = action.payload + MOVIE_CARDS_ON_PAGE - 1;
      return extend(state, {
        firstCard: action.payload,
        lastCard: lastNumber > filmsCount - 1 ? filmsCount - 1 : lastNumber,
      });
    case ActionType.SET_CARD_COUNT_TO_SHOW:
      return extend(state, {
        cardsCount: state.movies.length,
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
  setFirstCardNumber: (first) => ({
    type: ActionType.SET_FIRST_CARD_NUMBER,
    payload: first,
  }),
  setCardCountsToShow: () => ({
    type: ActionType.SET_CARD_COUNT_TO_SHOW,
  }),
};
