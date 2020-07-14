// selectors.js
import {createSelector} from 'reselect';
import NameSpace from '../name-space/name-space.js';
import {ALL_GENRES} from '../data/data.js';
import {getMovie} from '../movie/selectors.js';

const NAME_SPACE = NameSpace.DATA;

export const getPromoMovie = (state) => {
  return state[NAME_SPACE].promo;
};

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getGenresList = (state) => {
  return state[NAME_SPACE].genresList;
};

export const getMoviesList = (state) => {
  return state[NAME_SPACE].moviesList;
};

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getCardsCount = (state) => {
  return state[NAME_SPACE].cardsCount;
};

export const getFilmsByGenre = createSelector(
    getMoviesList,
    getGenre,
    getMovie,
    // movie может принимать значения undefined или активной карточки
    (moviesList, genre, movie) => {
      let result = [];
      if (genre === ALL_GENRES) {
        result = moviesList;
      } else {
        result = moviesList.filter((it) =>
          it !== movie && it.genre.includes(genre));
      }
      return result;
    }
);
