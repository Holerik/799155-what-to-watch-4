// moviecard-reviews.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fullInfo} from '../../reducer/data/data.js';
import Tabs from '../tabs/tabs.jsx';
import {getFullString} from '../moviecard-overview/moviecard-overview.jsx';
import MovieList from '../movielist/movielist.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import withActiveItem from '../../hocs/with-activeitem/with-activeitem.jsx';
import withCanPlay from '../../hocs/with-canplay/with-canplay.jsx';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getPlayState} from '../../reducer/movie/selectors.js';
import {getFilmsByGenre} from '../../reducer/data/selectors.js';
import {getReviews, getLoadStatus} from '../../reducer/review/selectors.js';
import {reviewInfo} from '../../reducer/review/review.js';
import Controls from '../controls/controls.jsx';
import AddComments from '../add-comments/add-comments.jsx';
import {AppRoutes, PageNumbers} from '../../const.js';
import history from '../../history.js';

const MovieTabs = withActiveItem(withCanPlay(MovieList));
const PageTabs = withActiveItem(Tabs);

class MoviecardReviews extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.loadStatus) {
      this.props.loadReviews(this.props.movieInfo);
    }
  }

  componentDidUpdate() {
    if (this.props.loadStatus) {
      this.props.loadReviews(this.props.movieInfo);
    }
  }

  render() {
    const {
      movieInfo,
      filmsInfo,
      setActiveMovie,
      playMovie,
      reviews,
      favoriteButtonClickHandler,
      firstCard,
      lastCard
    } = this.props;
    if (this.props.play) {
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
                  currentActiveItem={PageNumbers.REVIEWS}
                  listItems={this.props.tabItems}
                  setActiveItem={this.props.setActiveItem}
                />
                <div className="movie-card__reviews movie-card__row">
                  <div className="movie-card__reviews-col">
                    {<AddComments
                      comments={reviews}
                    />}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  play: getPlayState(state),
  filmsInfo: getFilmsByGenre(state),
  reviews: getReviews(state),
  loadStatus: getLoadStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  playMovie: () => {
    dispatch(ActionCreator.playMovie());
  },
});

MoviecardReviews.propTypes = {
  movieInfo: PropTypes.exact(fullInfo).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveMovie: PropTypes.func.isRequired,
  playMovie: PropTypes.func.isRequired,
  play: PropTypes.bool.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.exact(reviewInfo)).isRequired,
  favoriteButtonClickHandler: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  loadStatus: PropTypes.bool,
  firstCard: PropTypes.number.isRequired,
  lastCard: PropTypes.number.isRequired,
};

export {MoviecardReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MoviecardReviews);
