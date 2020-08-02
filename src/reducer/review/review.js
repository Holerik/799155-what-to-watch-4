// review.js
import PropTypes from 'prop-types';
import {extend} from '../../utils.js';

export const reviewInfo = {
  id: PropTypes.number.isRequired,
  authorId: PropTypes.number,
  author: PropTypes.string,
  rating: PropTypes.string,
  date: PropTypes.string,
  text: PropTypes.string.isRequired,
};

const mockReview = {
  id: -1,
  authorId: -1,
  author: ``,
  rating: `0`,
  date: `2020-07-24T14:16:23.037Z`,
  text: ``,
};

const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SET_LOAD_STATUS: `SET_LOAD_STATUS`,
};

const initialState = {
  reviews: [mockReview],
  loadStatus: true,
};

const ActionCreator = {
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
  setLoadStatus: (status) => {
    return {
      type: ActionType.SET_LOAD_STATUS,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.SET_LOAD_STATUS:
      return extend(state, {
        loadStatus: action.payload,
      });
  }
  return state;
};

const Operation = {
  loadReviews: (movie) => (dispatch, getState, api) => {
    return api.get(`/comments/${movie.id}`)
    .then((response) => {
      movie.reviews = [];
      const reviews = response.data.map((review) => {
        movie.reviews.push(review.id);
        return {
          id: review.id,
          authorId: review.user.id,
          author: review.user.name,
          rating: `${review.rating}`,
          date: review.date,
          text: review.comment,
        };
      });
      dispatch(ActionCreator.loadReviews(reviews));
      dispatch(ActionCreator.setLoadStatus(false));
    });
  },
  pushComment: (movie, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${movie.id}`, {
      rating: review.rating,
      comment: review.comment,
    })
    .then(() => {
      dispatch(ActionCreator.setLoadStatus(true));
    });
  },
};

export {reducer, Operation, ActionType, ActionCreator};
