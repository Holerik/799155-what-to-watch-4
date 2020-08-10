// const.js

export const MOVIE_CARDS_ON_PAGE = 8;

export const AppRoutes = {
  ROOT: `/`,
  LOGIN: `/login`,
  MOVIE_OVERVIEW: `/overview`,
  MOVIE_REVIEWS: `/reviews`,
  MOVIE_DETAILS: `/details`,
  ADD_REVIEW: `/addreview`,
  MY_LIST: `/mylist`,
  PLAY_VIDEO: `/play`,
};

export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 400;

export const STARS_COUNT = 5;
export const COMMENT_ERROR = `comment--error`;

export const MAX_GENRE_COUNT = 10;

export const TIME_INTERVAL = 1000; // ms

export const PageNumbers = {
  OVIERVIEW: 0,
  DETAILS: 1,
  REVIEWS: 2,
};

export const RatingLevels = {
  NORMAL: 3,
  GOOD: 5,
  VERY_GOOD: 8,
  AWESOME: 10,
};
