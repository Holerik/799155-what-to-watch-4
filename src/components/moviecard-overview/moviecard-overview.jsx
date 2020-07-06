// moviecard-overview.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../mocks/films.js';
import Tabs from '../tabs/tabs.jsx';
import MovieList from '../movielist/movielist.jsx';
import Header from '../header/header.jsx';
import withActiveItem from '../../hocs/with-activeitem/with-activeitem.jsx';
import withCanPlay from '../../hocs/with-canplay/with-canplay.jsx';

const MovieTabs = withActiveItem(withCanPlay(MovieList));

export const getFullString = (data, delimiter) => {
  let result = ``;
  for (let item of data) {
    result += String.fromCharCode(delimiter) + item;
  }
  return result.slice(1);
};

export const selectMoviesByGenre = (movie, filmsInfo) => {
  for (const genre of movie.genre) {
    const movies = filmsInfo.filter((film) => {
      return (film.id !== movie.id && film.genre.includes(genre));
    });
    if (movies.length > 0) {
      return movies.slice(0, 3);
    }
  }
  return null;
};

export const getRatingLevel = (rating) => {
  const level = [`Bad`, `Normal`, `Good`, `Very good`, `Awesome`];
  const fRating = parseFloat(rating);
  let index = 4;
  if (fRating < 10) {
    index = 3;
  }
  if (fRating < 8) {
    index = 2;
  }
  if (fRating < 5) {
    index = 1;
  }
  if (fRating < 3) {
    index = 0;
  }
  return level[index];
};


const MoviecardOverview = React.memo(function MoviecardOverview(props) {
  const {movieInfo, setActiveMovie} = props;
  movieInfo.rating.level = getRatingLevel(movieInfo.rating.score);
  const selectedMovies = selectMoviesByGenre(movieInfo, props.filmsInfo);
  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movieInfo.background} alt={movieInfo.altBackground} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <Header/>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movieInfo.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{getFullString(movieInfo.genre, 183)}</span>
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
                activeItem={0}
                setActiveItem={props.setActiveItem}
                tabItems={props.tabItems}
              />
              <div className="movie-rating">
                <div className="movie-rating__score">{movieInfo.rating.score}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{movieInfo.rating.level}</span>
                  <span className="movie-rating__count">{`${movieInfo.rating.count} ratings`}</span>
                </p>
              </div>

              <div className="movie-card__text">
                <p>{movieInfo.description}</p>
                <p>{movieInfo.review}</p>
                <p className="movie-card__director"><strong>{`Director: ${movieInfo.director}`}</strong></p>
                <p className="movie-card__starring"><strong>{`Starring: ${getFullString(movieInfo.starring, 44)}`}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieTabs
            listItems={selectedMovies}
            setActiveItem={setActiveMovie}
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
    </React.Fragment>
  );
});

MoviecardOverview.propTypes = {
  movieInfo: PropTypes.exact(fullInfo).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
};

export default MoviecardOverview;
