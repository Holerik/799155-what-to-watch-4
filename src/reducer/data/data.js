// data.js
import PropTypes from 'prop-types';
import {extend} from '../../utils.js';

export const fullInfo = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  altPoster: PropTypes.string,
  background: PropTypes.string,
  altBackground: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    score: PropTypes.string,
    level: PropTypes.string,
    count: PropTypes.number,
  }).isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.number),
  favorite: PropTypes.bool,
};

export const ALL_GENRES = `All genres`;

export const mockMovie = {
  id: -1,
  title: ``,
  poster: ``,
  altPoster: ``,
  background: ``,
  altBackground: ``,
  genre: [``],
  year: 0,
  duration: ``,
  age: ``,
  src: ``,
  preview: ``,
  rating: {
    score: ``,
    level: ``,
    count: 0,
  },
  director: ``,
  starring: [``],
  description: ``,
  review: ``,
  reviews: [],
  favorite: false,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  SET_CURRENT_GENRE: `SET_CURRENT_GENRE`,
  SET_PROMO_MOVIE: `SET_PROMO_MOVIE`,
  SET_GENRES_LIST: `SET_GENRES_LIST`,
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

const convertTimeToString = (time) => {
  const hours = Math.floor(time / 60);
  const mins = time - hours * 60;
  return `${hours}h ${mins}min`;
};

export const initialState = {
  // список всех загруженных карточек фильмов
  moviesList: [mockMovie],
  // список отобранных карточек фильмов
  movies: [mockMovie],
  // промо фильм
  promo: mockMovie,
  // текущий жанр
  genre: ALL_GENRES,
  // список всех жанров
  genresList: [ALL_GENRES],
  // количество карточек фильмов
  cardsCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRES_LIST:
      return extend(state, {
        genresList: action.payload,
      });
    case ActionType.SET_CURRENT_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.SET_PROMO_MOVIE:
      return extend(state, {
        promo: action.payload,
      });
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        moviesList: action.payload,
        movies: action.payload,
        cardsCount: action.payload.length,
      });
  }
  return state;
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  setPromoMovie: (promo) => {
    return {
      type: ActionType.SET_PROMO_MOVIE,
      payload: promo,
    };
  },
  setCurrentGenre: (genre) => {
    return {
      type: ActionType.SET_CURRENT_GENRE,
      payload: genre,
    };
  },
  setGenresList: (list) => {
    return {
      type: ActionType.SET_GENRES_LIST,
      payload: list,
    };
  },
};

export const getMovieObject = (movie) => {
  return {
    id: movie.id,
    title: movie.name,
    poster: movie[`poster_image`],
    altPoster: movie.name,
    background: movie[`background_image`],
    altBackground: movie.name,
    description: movie.description,
    review: ``,
    reviews: [0],
    genre: [movie.genre],
    year: movie.released,
    duration: convertTimeToString(movie[`run_time`]),
    age: `16+`,
    rating: {
      score: `${movie.rating}`,
      level: ``,
      count: movie[`scores_count`],
    },
    director: movie.director,
    starring: movie.starring,
    src: movie[`video_link`],
    preview: movie[`preview_video_link`],
    favorite: Boolean(movie[`is_favorite`]),
  };
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const moviesList = response.data.map((movie) => {
          return getMovieObject(movie);
        });
        dispatch(ActionCreator.loadMovies(moviesList));
        dispatch(ActionCreator.setGenresList(createGenresList(moviesList)));
        dispatch(ActionCreator.setCurrentGenre(ALL_GENRES));
      });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const promoMovie = getMovieObject(response.data);
        dispatch(ActionCreator.setPromoMovie(promoMovie));
      });
  },
};

export {reducer, Operation, ActionType, ActionCreator};
