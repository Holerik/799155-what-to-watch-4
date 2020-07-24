// review.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {reviewInfo} from '../../reducer/review/review.js';

const Review = React.memo(function Review(props) {
  const {review} = props;
  const options = {year: `numeric`, month: `long`, day: `numeric`};
  const date = (new Date(review.date)).toLocaleDateString(`en-US`, options);

  return <React.Fragment>
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.text}</p>

        <footer className="review__details">
          <cite className="review__author">{review.author}</cite>
          <time className="review__date" dateTime={review.date}>{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{`${review.rating}`}</div>
    </div>
  </React.Fragment>;
});

export default Review;

Review.propTypes = {
  review: PropTypes.exact(reviewInfo).isRequired,
};
