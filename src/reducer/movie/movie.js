// movie.js
import {extend} from '../../utils.js';

export const MOVIE_CARDS_ON_PAGE = 8;

const ActionType = {
  SET_MOVIE: `SET_MOVIE`,
  SET_PAGE: `SET_PAGE`,
  SET_FIRST_CARD_NUMBER: `SET_FIRST_CARD_NUMBER`,
  PLAY_MOVIE: `PLAY_MOVIE`,
  STOP_MOVIE: `STOP_MOVIE`,
  RESET_MOVIE: `RESET_MOVIE`,
};

const initialState = {
  // текущая страница
  page: 0,
  // активная карточка
  movie: undefined,
  // номер первой карточки на странице
  firstCard: 0,
  // номер последней карточки на странице
  lastCard: MOVIE_CARDS_ON_PAGE,
  // пригрывать видео
  play: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MOVIE:
      return extend(state, {
        movie: action.payload,
      });
    case ActionType.SET_PAGE:
      return extend(state, {
        page: action.payload,
      });
    case ActionType.SET_FIRST_CARD_NUMBER:
      const filmsCount = action.payload.maxNumber;
      if (action.payload.firstNumber >= filmsCount) {
        return state;
      }
      const lastNumber = action.payload.firstNumber + MOVIE_CARDS_ON_PAGE - 1;
      return extend(state, {
        firstCard: action.payload.firstNumber,
        lastCard: lastNumber > filmsCount - 1 ? filmsCount - 1 : lastNumber,
      });
    case ActionType.PLAY_MOVIE:
      return extend(state, {
        play: action.payload,
      });
    case ActionType.STOP_MOVIE:
      return extend(state, {
        play: action.payload,
      });
    case ActionType.RESET_MOVIE:
      return extend(state, {
        movie: action.payload,
      });
  }
  return state;
};

const ActionCreator = {
  setMovie: (movie) => ({
    type: ActionType.SET_MOVIE,
    payload: movie,
  }),
  setPage: (page) => ({
    type: ActionType.SET_PAGE,
    payload: page,
  }),
  setFirstCardNumber: ({firstNumber, maxNumber}) => ({
    type: ActionType.SET_FIRST_CARD_NUMBER,
    payload: {firstNumber, maxNumber},
  }),
  playMovie: () => ({
    type: ActionType.PLAY_MOVIE,
    payload: true,
  }),
  stopMovie: () => ({
    type: ActionType.STOP_MOVIE,
    payload: false,
  }),
  resetMovie: (movie) => ({
    type: ActionType.RESET_MOVIE,
    payload: movie,
  }),
};

export {reducer, ActionType, ActionCreator};

