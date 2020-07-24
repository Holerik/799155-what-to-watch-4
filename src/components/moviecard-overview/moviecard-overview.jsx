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
import withVideo from '../../hocs/with-video/with-video.jsx';
import Video from '../video/video.jsx';
import {getFilmsByGenre} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const VideoPlayer = withVideo(Video);
const MovieTabs = withActiveItem(withCanPlay(MovieList));

export const getFullString = (data, delimiter) => {
  let result = ``;
  for (let item of data) {
    result += String.fromCharCode(delimiter) + item;
  }
  return result.slice(1);
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
  const {
    movieInfo,
    setActiveMovie,
    playMovie,
    stopMovie,
    filmsInfo,
    authorizationStatus,
    favoriteButtonClickHandler
  } = props;
  movieInfo.rating.level = getRatingLevel(movieInfo.rating.score);
  if (props.play) {
    return (
      <VideoPlayer
        src={movieInfo.src}
        isMuted={false}
        poster={movieInfo.poster}
        width={480}
        isPlaying={true}
        onStopPlayMovie={stopMovie}
      />
    );
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
                {authorizationStatus === AuthorizationStatus.AUTH &&
                  <button className="btn btn--list movie-card__button"
                    type="button" onClick={() => favoriteButtonClickHandler(movieInfo)}
                  >
                    {movieInfo.favorite ? (
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#in-list"></use>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                    )}
                    <span>My list</span>
                  </button>
                }
                {authorizationStatus === AuthorizationStatus.AUTH &&
                  <a href="/add-review" className="btn movie-card__button">Add review</a>
                }
                {authorizationStatus === AuthorizationStatus.NO_AUTH &&
                  <div className="btn btn--list movie-card__button">
                    <a href="/sign-in" className="logo__link">
                      <span>My list</span>
                    </a>
                  </div>
                }
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
            listItems={filmsInfo}
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
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  playMovie: () => {
    dispatch(ActionCreator.playMovie());
  },
  stopMovie: () => {
    dispatch(ActionCreator.stopMovie());
  }
});

MoviecardOverview.propTypes = {
  authorizationStatus: PropTypes.oneOf([
    AuthorizationStatus.AUTH,
    AuthorizationStatus.NO_AUTH
  ]),
  movieInfo: PropTypes.exact(fullInfo).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
  playMovie: PropTypes.func.isRequired,
  stopMovie: PropTypes.func.isRequired,
  play: PropTypes.bool.isRequired,
  favoriteButtonClickHandler: PropTypes.func.isRequired,
};

export {MoviecardOverview};
export default connect(mapStateToProps, mapDispatchToProps)(MoviecardOverview);
