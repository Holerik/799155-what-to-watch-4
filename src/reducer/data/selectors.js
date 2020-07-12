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
    (resultOne, resultTwo, resultThree) => {
      let result = [];
      if (resultTwo === ALL_GENRES) {
        result = resultOne;
      } else {
        result = resultOne.filter((it) =>
          it !== resultThree && it.genre.includes(resultTwo));
      }
      return result;
    }
);
