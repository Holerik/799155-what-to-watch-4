// moviecard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../mocks/films.js';
import Video from '../video/video.jsx';

const Moviecard = (props) => {
  if (props.canPlayVideo && (props.activeMovieId === props.movie.id)) {
    return (
      <article className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image" onMouseOut={props.onMovieCardOut}>
          <Video
            isPlaying={true}
            src={props.movie.preview}
            isMuted={true}
            poster={props.movie.poster}
            width={280}
          />
        </div>
      </article>
    );
  }
  return (
    <article className="small-movie-card catalog__movies-card">
      <div onMouseOver={props.onMovieCardActivate} onMouseOut={props.onMovieCardOut}
        className="small-movie-card__image" id={`${props.movie.id }`} onClick={props.onMovieTitleClick}>
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
  canPlayVideo: PropTypes.bool.isRequired,
  activeMovieId: PropTypes.number.isRequired,
};

export default Moviecard;
