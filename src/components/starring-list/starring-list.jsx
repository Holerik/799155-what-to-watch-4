// starring-list.jsx
import React from 'react';
import PropTypes from 'prop-types';

const StarringList = (props) => {
  return (
    <React.Fragment>
      {props.stars.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item} <br />
          </React.Fragment>

        );
      })}
    </React.Fragment>
  );
};

StarringList.propTypes = {
  stars: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StarringList;
