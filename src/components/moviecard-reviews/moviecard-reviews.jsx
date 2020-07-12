// moviecard-reviews.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fullInfo} from '../../reducer/data/data.js';
import Tabs from '../tabs/tabs.jsx';
import {getFullString} from '../moviecard-overview/moviecard-overview.jsx';
import MovieList from '../movielist/movielist.jsx';
import Header from '../header/header.jsx';
import withActiveItem from '../../hocs/with-activeitem/with-activeitem.jsx';
import withCanPlay from '../../hocs/with-canplay/with-canplay.jsx';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getPlayState} from '../../reducer/movie/selectors.js';
import withVideo from '../../hocs/with-video/with-video.jsx';
import Video from '../video/video.jsx';
import {getFilmsByGenre} from '../../reducer/data/selectors.js';


const VideoPlayer = withVideo(Video);
const MovieTabs = withActiveItem(withCanPlay(MovieList));

const MoviecardReviews = React.memo(function MoviecardReviews(props) {
  const {movieInfo, filmsInfo, setActiveMovie, playMovie, stopMovie} = props;
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
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={playMovie}
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
                activeItem={2}
                setActiveItem={props.setActiveItem}
                tabItems={props.tabItems}
              />
              <div className="movie-card__reviews movie-card__row">
                <div className="movie-card__reviews-col">
                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&lsquo;s funniest and most exquisitely designed movies in years.</p>

                      <footer className="review__details">
                        <cite className="review__author">Kate Muir</cite>
                        <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,9</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">Anderson&lsquo;s films are too precious for some, but for those of us willing to lose ourselves in them, they&lsquo;re a delight. &quot;The Grand Budapest Hotel&quot; is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

                      <footer className="review__details">
                        <cite className="review__author">Bill Goodykoontz</cite>
                        <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,0</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">I didn&lsquo;t find it amusing, and while I can appreciate the creativity, it&lsquo;s an hour and 40 minutes I wish I could take back.</p>

                      <footer className="review__details">
                        <cite className="review__author">Amanda Greever</cite>
                        <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,0</div>
                  </div>
                </div>
                <div className="movie-card__reviews-col">
                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

                      <footer className="review__details">
                        <cite className="review__author">Matthew Lickona</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,2</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                      <footer className="review__details">
                        <cite className="review__author">Paula Fleri-Soler</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,6</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                      <footer className="review__details">
                        <cite className="review__author">Paula Fleri-Soler</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,0</div>
                  </div>
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
            listItems= {filmsInfo}
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

const mapStateToProps = (state) => ({
  play: getPlayState(state),
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

MoviecardReviews.propTypes = {
  movieInfo: PropTypes.exact(fullInfo).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
  playMovie: PropTypes.func.isRequired,
  stopMovie: PropTypes.func.isRequired,
  play: PropTypes.bool.isRequired,
};

export {MoviecardReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MoviecardReviews);
