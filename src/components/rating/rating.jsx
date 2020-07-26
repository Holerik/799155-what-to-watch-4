// rating.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Rating = React.memo(function RatingFragment({index}) {
  return <React.Fragment>
    <input className="rating__input" id={`star-${index}`} type="radio" name="rating" value={`${index}`}/>
    <label className="rating__label" htmlFor={`star-${index}`}>{`Rating ${index}`}</label>
  </React.Fragment>;
});

Rating.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Rating;
