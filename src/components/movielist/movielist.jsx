// movielist.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Moviecard from '../moviecard/moviecard.jsx';

const Movielist = (props) => {
  return (
    <div className="catalog__movies-list">
      {
        props.titles.map((item, index) => (
          <Moviecard
            key={item + index}
            title={item}
          />
        ))
      }
    </div>
  );
};

Movielist.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movielist;
