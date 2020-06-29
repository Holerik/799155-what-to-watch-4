// moviecard-details.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../mocks/films.js';
import Tabs from '../tabs/tabs.jsx';
import {selectMoviesByGenre} from '../moviecard-overview/moviecard-overview.jsx';
import Movielist from '../movielist/movielist.jsx';
import StarringList from '../starring-list/starring-list.jsx';

const MoviecardDetails = (props) => {
  const {movieInfo, filmsInfo} = props;
  const selectedMovies = selectMoviesByGenre(movieInfo, filmsInfo);
  return <React.Fragment>
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={movieInfo.background} alt={movieInfo.altBackground} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{movieInfo.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{movieInfo.genre[0]}</span>
              <span className="movie-card__year">{movieInfo.year}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={movieInfo.poster} alt={movieInfo.altPoster} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <Tabs
              activeItem={1}
              setActiveItem={props.setActiveItem}
              tabItems={props.tabItems}
            />
            <div className="movie-card__text movie-card__row">
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Director</strong>
                  <span className="movie-card__details-value">{movieInfo.director}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Starring</strong>
                  <span className="movie-card__details-value">
                    {<StarringList stars={movieInfo.starring}/>}
                  </span>
                </p>
              </div>

              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Run Time</strong>
                  <span className="movie-card__details-value">{movieInfo.duration}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Genre</strong>
                  <span className="movie-card__details-value">{movieInfo.genre[0]}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Released</strong>
                  <span className="movie-card__details-value">{movieInfo.year}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <Movielist
          filmsInfo={selectedMovies}
          onMovieTitleClick={props.onMovieTitleClick}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>;
};

MoviecardDetails.propTypes = {
  movieInfo: PropTypes.exact(fullInfo).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviecardDetails;
