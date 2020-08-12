// moviecard-overview.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fullInfo} from '../../reducer/data/data.js';
import Tabs from '../tabs/tabs.jsx';
import MovieList from '../movielist/movielist.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import withActiveItem from '../../hocs/with-activeitem/with-activeitem.jsx';
import withCanPlay from '../../hocs/with-canplay/with-canplay.jsx';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getPlayState} from '../../reducer/movie/selectors.js';
import {getFilmsByGenre} from '../../reducer/data/selectors.js';
import Controls from '../controls/controls.jsx';
import {AppRoutes, PageNumbers, RatingLevels} from '../../const.js';
import history from '../../history.js';

const MovieTabs = withActiveItem(withCanPlay(MovieList));
const PageTabs = withActiveItem(Tabs);

export const getFullString = (data, delimiter) => {
  let result = ``;
  for (let item of data) {
    result += String.fromCharCode(delimiter) + item;
  }
  return result.slice(1);
};

export const getLevelNameByRating = (rating) => {
  const levelRating = parseFloat(rating);
  if (levelRating === RatingLevels.AWESOME) {
    return `Awesome`;
  }
  if (levelRating > RatingLevels.VERY_GOOD) {
    return `Very good`;
  }
  if (levelRating > RatingLevels.GOOD) {
    return `Good`;
  }
  if (levelRating > RatingLevels.NORMAL) {
    return `Normal`;
  }
  return `Bad`;
};

const MoviecardOverview = React.memo(function MoviecardOverview(props) {
  const {
    movieInfo,
    setActiveMovie,
    playMovie,
    filmsInfo,
    favoriteButtonClickHandler,
    play,
    setActiveItem,
    tabItems,
    firstCard,
    lastCard
  } = props;
  movieInfo.rating.level = getLevelNameByRating(movieInfo.rating.score);
  if (play) {
    return history.push(`${AppRoutes.PLAY_VIDEO}/${movieInfo.id}`);
  }
  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movieInfo.background} alt={movieInfo.altBackground} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header/>
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movieInfo.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{getFullString(movieInfo.genre, 183)}</span>
                <span className="movie-card__year">{movieInfo.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button"
                  onClick={playMovie} type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {<Controls
                  favoriteButtonClickHandler={favoriteButtonClickHandler}
                />}
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
              <PageTabs
                currentActiveItem={PageNumbers.OVIERVIEW}
                listItems={tabItems}
                setActiveItem={setActiveItem}
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
            listItems={filmsInfo.slice(firstCard, lastCard + 1)}
            setActiveItem={setActiveMovie}
          />
        </section>
        <Footer/>
      </div>
    </React.Fragment>
  );
});

const mapStateToProps = (state) => ({
  play: getPlayState(state),
  filmsInfo: getFilmsByGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  playMovie: () => {
    dispatch(ActionCreator.playMovie());
  },
});

MoviecardOverview.propTypes = {
  movieInfo: PropTypes.exact(fullInfo),
  setActiveItem: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
  playMovie: PropTypes.func.isRequired,
  play: PropTypes.bool.isRequired,
  favoriteButtonClickHandler: PropTypes.func.isRequired,
  firstCard: PropTypes.number.isRequired,
  lastCard: PropTypes.number.isRequired,
};

export {MoviecardOverview};
export default connect(mapStateToProps, mapDispatchToProps)(MoviecardOverview);
