// add_comments.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {reviewInfo} from '../../reducer/review/review.js';
import Review from '../review/review.jsx';

const AddComments = React.memo(function AddComments({comments}) {
  return (
    <React.Fragment>
      {comments.map((review) => {
        return (
          <Review
            key={review.id}
            review={review}
          />
        );
      })}
    </React.Fragment>
  );
});

AddComments.propTypes = {
  comments: PropTypes.arrayOf(
      PropTypes.exact(reviewInfo)).isRequired,
};

export default AddComments;
