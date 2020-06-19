// app.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {shortInfo} from '../../mocks/films.js';

const onMovieTitleClick = () => {};

const App = (props) => {
  return (
    <Main
      promoMovie={props.promoMovie}
      filmsInfo={props.filmsInfo}
      onMovieTitleClick={onMovieTitleClick}
    />);
};

App.propTypes = {
  promoMovie: PropTypes.shape({
    genre: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(shortInfo)).isRequired,
};

export default App;
