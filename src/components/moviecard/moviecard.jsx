// moviecard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {shortInfo} from '../../mocks/films.js';

const Moviecard = (props) => {
  return <React.Fragment>
    <article className="small-movie-card catalog__movies-card">
      <div onMouseOver={props.onMovieCardActivate} onMouseOut={props.onMovieCardOut}
        id={`${props.movie.id }`} className="small-movie-card__image">
        <img src={props.movie.poster} alt={props.movie.altPoster} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link"
          href="" onClick={props.onMovieTitleClick}>{props.movie.title}</a>
      </h3>
    </article>
  </React.Fragment>;
};

Moviecard.propTypes = {
  movie: PropTypes.exact(shortInfo),
  onMovieTitleClick: PropTypes.func.isRequired,
  onMovieCardActivate: PropTypes.func.isRequired,
  onMovieCardOut: PropTypes.func.isRequired,
};

export default Moviecard;
