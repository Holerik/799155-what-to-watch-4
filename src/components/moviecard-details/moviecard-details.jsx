// moviecard-details.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fullInfo} from '../../reducer/data/data.js';
import Tabs from '../tabs/tabs.jsx';
import {getFullString} from '../moviecard-overview/moviecard-overview.jsx';
import MovieList from '../movielist/movielist.jsx';
import StarringList from '../starring-list/starring-list.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import withActiveItem from '../../hocs/with-activeitem/with-activeitem.jsx';
import withCanPlay from '../../hocs/with-canplay/with-canplay.jsx';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getPlayState} from '../../reducer/movie/selectors.js';
import {getFilmsByGenre} from '../../reducer/data/selectors.js';
import Controls from '../controls/controls.jsx';
import {AppRoutes, PageNumbers} from '../../const.js';
import history from '../../history.js';

const MovieTabs = withActiveItem(withCanPlay(MovieList));
const PageTabs = withActiveItem(Tabs);

const MoviecardDetails = React.memo(function MoviecardDetails(props) {
  const {
    movieInfo,
    filmsInfo,
    setActiveMovie,
    playMovie,
    favoriteButtonClickHandler,
    firstCard,
    lastCard
  } = props;
  const genres = getFullString(movieInfo.genre, 183);
  if (props.play) {
    return history.push(`${AppRoutes.PLAY_VIDEO}/${movieInfo.id}`);
  }
  return <React.Fragment>
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
              <span className="movie-card__genre">{genres}</span>
              <span className="movie-card__year">{movieInfo.year}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button"
                onClick={playMovie}
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
              currentActiveItem={PageNumbers.DETAILS}
              listItems={props.tabItems}
              setActiveItem={props.setActiveItem}
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
                    <StarringList stars={movieInfo.starring}/>
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
                  <span className="movie-card__details-value">{genres}</span>
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
        <MovieTabs
          listItems={filmsInfo.slice(firstCard, lastCard + 1)}
          setActiveItem={setActiveMovie}
        />
      </section>
      <Footer/>
    </div>
  </React.Fragment>;
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

MoviecardDetails.propTypes = {
  movieInfo: PropTypes.exact(fullInfo).isRequired,
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

export {MoviecardDetails};
export default connect(mapStateToProps, mapDispatchToProps)(MoviecardDetails);
