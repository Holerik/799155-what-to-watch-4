// rating.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Rating = React.memo(function RatingFragment({index, onClick}) {
  return <React.Fragment>
    <input className="rating__input" id={`star-${index}`}
      type="radio" name="rating" value={`${index}`} onClick={onClick}/>
    <label className="rating__label" htmlFor={`star-${index}`}>{`Rating ${index}`}</label>
  </React.Fragment>;
});

Rating.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Rating;
