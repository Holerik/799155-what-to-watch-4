// moviecard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../mocks/films.js';

const Moviecard = (props) => {
  return (
    <article className="small-movie-card catalog__movies-card">
      <div onMouseOver={props.onMovieCardActivate} onMouseOut={props.onMovieCardOut}
        className="small-movie-card__image">
        <img src={props.movie.poster} alt={props.movie.altPoster} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link"
          href="" onClick={props.onMovieTitleClick}>{props.movie.title}</a>
      </h3>
    </article>
  );
};

Moviecard.propTypes = {
  movie: PropTypes.exact(fullInfo),
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieCardActivate: PropTypes.func.isRequired,
  onMovieCardOut: PropTypes.func.isRequired,
};

export default Moviecard;
