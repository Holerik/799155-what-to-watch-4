// main.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MovieList from '../movielist/movielist.jsx';
import {fullInfo} from '../../reducer/data/data.js';
import ShowMore from '../show-more/show-more.jsx';
import Header from '../header/header.jsx';
import withActiveItem from '../../hocs/with-activeitem/with-activeitem.jsx';
import withCanPlay from '../../hocs/with-canplay/with-canplay.jsx';
import GenreList from '../genre-list/genre-list.jsx';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getPlayState} from '../../reducer/movie/selectors.js';
import withVideo from '../../hocs/with-video/with-video.jsx';
import Video from '../video/video.jsx';
import {getGenresList, getFilmsByGenre} from '../../reducer/data/selectors.js';

const MAX_GENRE_COUNT = 10;

const VideoPlayer = withVideo(Video);
const GenreTabs = withActiveItem(GenreList);
const MovieTabs = withActiveItem(withCanPlay(MovieList));

const Main = (props) => {
  const {
    promoMovie,
    filmsInfo,
    onSelectGenre,
    setActiveMovie,
    genre,
    genresList,
    firstCard,
    lastCard,
    playMovie,
    stopMovie
  } = props;
  const setGenre = (index) => {
    onSelectGenre(genresList[index]);
  };
  const activeItem = genresList.indexOf(genre);

  if (props.play) {
    return (
      <VideoPlayer
        src={promoMovie.src}
        isMuted={false}
        poster={promoMovie.poster}
        width={480}
        isPlaying={true}
        onStopPlayMovie={stopMovie}
      />
    );
  }
  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Header/>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovie.genre[0]}</span>
                <span className="movie-card__year">{promoMovie.year}</span>
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
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreTabs
            currentActiveItem={activeItem}
            listItems={genresList}
            setActiveItem={setGenre}
            maxItemsCount={MAX_GENRE_COUNT}
          />
          <MovieTabs
            listItems={filmsInfo.slice(firstCard, lastCard + 1)}
            setActiveItem={setActiveMovie}
          />
          <div className="catalog__more">
            <ShowMore/>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
};

const mapStateToProps = (state) => ({
  play: getPlayState(state),
  genresList: getGenresList(state),
  filmsInfo: getFilmsByGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  playMovie: () => {
    dispatch(ActionCreator.playMovie());
  },
  stopMovie: () => {
    dispatch(ActionCreator.stopMovie());
  }
});

Main.propTypes = {
  promoMovie: PropTypes.exact(fullInfo).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  firstCard: PropTypes.number.isRequired,
  playMovie: PropTypes.func.isRequired,
  stopMovie: PropTypes.func.isRequired,
  play: PropTypes.bool.isRequired,
  lastCard: PropTypes.number.isRequired,
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
