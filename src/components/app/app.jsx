// app.jsx
import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviecardDetails from '../moviecard-details/moviecard-details.jsx';
import MoviecardOverview from '../moviecard-overview/moviecard-overview.jsx';
import MoviecardReviews from '../moviecard-reviews/moviecard-reviews.jsx';
import MyList from '../my-list/my-list.jsx';
import {fullInfo} from '../../reducer/data/data.js';
import {ActionCreator as DataCreator} from '../../reducer/data/data.js';
import {ActionCreator as MovieCreator} from '../../reducer/movie/movie.js';
import {
  ActionCreator as UserCreator,
  AuthorizationStatus,
  Operation as UserOperation,
} from '../../reducer/user/user.js';
import {
  getMovie,
  getPage,
  getFirstCardNumber,
  getLastCardNumber
} from '../../reducer/movie/selectors.js';
import {
  getPromoMovie,
  getGenre,
  getFilmsByGenre,
  getGenresList,
  getMoviesList,
  getFavoritesCount,
} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getAuthorInfo} from '../../reducer/user/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';
import {
  Operation as ReviewOperation,
  ActionCreator as ReviewCreator,
} from '../../reducer/review/review.js';
import {getLoadStatus, getSubmitBlock} from '../../reducer/review/selectors.js';
import withAddReview from '../../hocs/with-addreview/with-addreview.jsx';
import AddReview from '../add-review/add-review.jsx';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {AppRoutes} from '../../const.js';
import history from '../../history.js';
import PrivateRoute from '../private-route/private-route.jsx';
import LoginRoute from '../login-route/login-route.jsx';
import NotFound from '../not-found/not-found.jsx';
import Video from '../video/video.jsx';
import withVideo from '../../hocs/with-video/with-video.jsx';
import {extend} from '../../utils.js';
import {MOVIE_CARDS_ON_PAGE} from '../../const.js';

const AddReviewText = withAddReview(AddReview);
const VideoPlayer = withVideo(Video);
const tabItems = [`Overview`, `Details`, `Reviews`];

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this._setActivePage = this._setActivePage.bind(this);
    this._setActiveGenre = this._setActiveGenre.bind(this);
    this._setActiveMovie = this._setActiveMovie.bind(this);
    this._onSignIn = this._onSignIn.bind(this);
    this._onAddReviewText = this._onAddReviewText.bind(this);
    this._changeFavoriteStatus = this._changeFavoriteStatus.bind(this);
  }

  _onSignIn(authData) {
    this.props.login(authData);
    history.push(AppRoutes.ROOT);
  }

  _onAddReviewText(movie, comment) {
    this.props.onAddReviewComment(movie, comment);
  }

  _setActiveMovie(activeMovieId) {
    const movie = this.props.filmsInfo.find((film) => film.id === activeMovieId);
    this.props.setMovie(movie);
    this.props.setGenre(movie.genre[0]);
    this.props.setLimitCardsNumbers({
      first: 0,
      max: MOVIE_CARDS_ON_PAGE
    });
  }

  _setActivePage(page) {
    this.props.setPage(page);
  }

  _setActiveGenre(genre) {
    this.props.setGenre(genre);
    this.props.setCardsCount(this.props.filmsInfo.length);
    this.props.setLimitCardsNumbers({
      first: 0,
      max: MOVIE_CARDS_ON_PAGE
    });
  }

  _changeFavoriteStatus(movie) {
    const {promo, favoritesCount, allFilmsInfo} = this.props;
    let favorites = favoritesCount;
    let payload = {};
    if (promo.id === movie.id) {
      favorites = promo.favorite ? favorites - 1 : favorites + 1;
      payload = {
        film: movie,
        promoMovie: extend(promo, {
          favorite: !promo.favorite,
        }),
        allFilms: allFilmsInfo,
        favoritesCount: favorites,
      };
    } else {
      payload = {
        promoMovie: promo,
        allFilms: allFilmsInfo.map((item) => {
          if (movie.id === item.id) {
            favorites = movie.favorite ? favorites-- : favorites++;
            return extend(item, {
              favorite: !movie.favorite
            });
          }
          return item;
        }),
        film: allFilmsInfo.find((item) => item.id === movie.id),
        favoritesCount: favorites,
      };
    }
    this.props.changeFavoriteStatus(payload);
  }

  _renderMainScreen() {
    if (this.props.movie === undefined) {
      return (
        <Main
          promoMovie={this.props.promo}
          setActiveMovie={this._setActiveMovie}
          onSelectGenre={this._setActiveGenre}
          genre={this.props.genre}
          firstCard={this.props.firstCard}
          lastCard={this.props.lastCard}
          favoriteButtonClickHandler={this._changeFavoriteStatus}
        />);
    }
    return history.push(`${AppRoutes.MOVIE}/${this.props.movie.id}`);
  }

  _getMovie(routeProps) {
    const id = Number(routeProps.match.params.id);
    if (id === this.props.promo.id) {
      return this.props.promo;
    }
    return this.props.allFilmsInfo.find((film) => film.id === id);
  }

  render() {
    const props = {
      setActiveItem: this._setActivePage,
      tabItems,
      setActiveMovie: this._setActiveMovie,
      favoriteButtonClickHandler: this._changeFavoriteStatus,
      loadReviews: this.props.loadReviews,
      firstCard: this.props.firstCard,
      lastCard: this.props.lastCard,
    };
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoutes.ROOT}>
            {this._renderMainScreen()}
          </Route>
          <LoginRoute exact path={AppRoutes.LOGIN}
            authorizationStatus={this.props.authorizationStatus}
            render={() => {
              return (
                <SignIn
                  onSubmit={this._onSignIn}
                />);
            }}
          />

          <Route exact path={`${AppRoutes.MOVIE}/:id`}
            render={(routeProps) => {
              const movie = this._getMovie(routeProps);
              switch (this.props.page) {
                case 0:
                  return (
                    <MoviecardOverview
                      {...props}
                      movieInfo={movie}
                    />
                  );
                case 1:
                  return (
                    <MoviecardDetails
                      {...props}
                      movieInfo={movie}
                    />
                  );
                case 2:
                  return (
                    <MoviecardReviews
                      {...props}
                      movieInfo={movie}
                    />
                  );
              }
              return null;
            }}
          />
          <PrivateRoute exact path={AppRoutes.MY_LIST}
            authorizationStatus={this.props.authorizationStatus}
            render={() => {
              return (
                <MyList
                  setActiveMovie={this._setActiveMovie}
                  firstCard={this.props.firstCard}
                  lastCard={this.props.lastCard}
                />
              );
            }}
          />
          <PrivateRoute exact path={`${AppRoutes.MOVIE}/:id/review`}
            authorizationStatus={this.props.authorizationStatus}
            render={(routeProps) => {
              const id = Number(routeProps.match.params.id);
              const movie = this.props.allFilmsInfo.find((film) => film.id === id);
              return (
                <AddReviewText
                  onSubmit={this._onAddReviewText}
                  movieInfo={movie}
                  avatar={`${this.props.authorInfo.avatar}`}
                  setPage={this.props.setPage}
                  setMovie={this.props.setMovie}
                  submitIsBlocked={this.props.reviewSubmitStatus}
                />
              );
            }}
          />
          <Route exact path={`${AppRoutes.PLAY_VIDEO}/:id`}
            render={(routeProps) => {
              const id = Number(routeProps.match.params.id);
              const movie = this.props.promo.id === id ? this.props.promo : this.props.allFilmsInfo.find((film) => film.id === id);
              return (
                <VideoPlayer
                  src={movie.src}
                  isMuted={false}
                  poster={movie.poster}
                  width={480}
                  isPlaying={true}
                  onStopPlayMovie={this.props.stopMovie}
                />
              );
            }}
          />
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorInfo: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }),
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  allFilmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  movie: PropTypes.exact(fullInfo),
  promo: PropTypes.exact(fullInfo).isRequired,
  page: PropTypes.number,
  genre: PropTypes.string,
  genresList: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPage: PropTypes.func.isRequired,
  setMovie: PropTypes.func.isRequired,
  setPromo: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
  setCardsCount: PropTypes.func.isRequired,
  changeFavoriteStatus: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([
    AuthorizationStatus.AUTH,
    AuthorizationStatus.NO_AUTH
  ]),
  firstCard: PropTypes.number,
  lastCard: PropTypes.number,
  setLimitCardsNumbers: PropTypes.func.isRequired,
  onAddReviewComment: PropTypes.func.isRequired,
  setAuthorInfo: PropTypes.func,
  resetFavoriteMovie: PropTypes.func.isRequired,
  stopMovie: PropTypes.func.isRequired,
  favoritesCount: PropTypes.number,
  loadReviewStatus: PropTypes.bool,
  reviewSubmitStatus: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  authorInfo: getAuthorInfo(state),
  movie: getMovie(state),
  page: getPage(state),
  genre: getGenre(state),
  genresList: getGenresList(state),
  filmsInfo: getFilmsByGenre(state),
  promo: getPromoMovie(state),
  firstCard: getFirstCardNumber(state),
  lastCard: getLastCardNumber(state),
  allFilmsInfo: getMoviesList(state),
  favoritesCount: getFavoritesCount(state),
  loadReviewStatus: getLoadStatus(state),
  reviewSubmitStatus: getSubmitBlock(state),
});

const mapDispatchToProps = (dispatch) => ({
  setLimitCardsNumbers(limits) {
    dispatch(MovieCreator.setFirstCardNumber({
      firstNumber: limits.first,
      maxNumber: limits.max
    }));
  },
  setAuthorInfo(authInfo) {
    dispatch(UserCreator.setAuthorInfo(authInfo));
  },
  setGenre(genre) {
    dispatch(DataCreator.setCurrentGenre(genre));
  },
  setMovie(movie) {
    dispatch(MovieCreator.setMovie(movie));
  },
  setPromo(movie) {
    dispatch(DataCreator.setPromo(movie));
  },
  setPage(page) {
    dispatch(MovieCreator.setPage(page));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  changeFavoriteStatus(payload) {
    dispatch(DataOperation.changeFavoriteStatus(payload));
  },
  setCardsCount(count) {
    dispatch(DataCreator.setCardsCount(count));
  },
  loadReviews(movie) {
    dispatch(ReviewCreator.setLoadStatus(false));
    dispatch(ReviewOperation.loadReviews(movie));
  },
  onAddReviewComment(movie, review) {
    dispatch(ReviewCreator.setSubmitBlock(true));
    dispatch(ReviewCreator.setLoadStatus(false));
    dispatch(ReviewOperation.pushComment(movie, review));
  },
  resetFavoriteMovie(movie) {
    dispatch(MovieCreator.resetMovie(movie));
  },
  stopMovie: () => {
    dispatch(MovieCreator.stopMovie());
    history.goBack();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};
