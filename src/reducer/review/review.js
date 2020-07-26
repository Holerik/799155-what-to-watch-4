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
  date: (new Date()).toISOString(),
  text: ``,
};

const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const initialState = {
  reviews: [mockReview],
};

const ActionCreator = {
  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
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
    });
  },
  pushComment: (movie, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${movie.id}`, {
      rating: review.rating,
      comment: review.comment,
    });
  },
};

export {reducer, Operation, ActionType, ActionCreator};
