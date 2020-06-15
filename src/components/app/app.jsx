// app.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  return (
    <Main
      promoMovie={props.promoMovie}
      movieTitles={props.movieTitles}
    />);
};

App.propTypes = {
  promoMovie: PropTypes.shape({
    genre: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  movieTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
