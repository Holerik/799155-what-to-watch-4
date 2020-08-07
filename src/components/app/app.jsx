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
import {ActionCreator as MovieCreator, MOVIE_CARDS_ON_PAGE} from '../../reducer/movie/movie.js';
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
} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getAuthorInfo} from '../../reducer/user/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';
import {
  Operation as ReviewOperation,
} from '../../reducer/review/review.js';
import withAddReview from '../../hocs/with-addreview/with-addreview.jsx';
import AddReview from '../add-review/add-review.jsx';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {AppRoutes} from '../../const.js';
import history from '../../history.js';
import PrivateRoute from '../private-route/private-route.jsx';
import NotFound from '../not-found/not-found.jsx';
import Video from '../video/video.jsx';
import withVideo from '../../hocs/with-video/with-video.jsx';

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
    location.href = AppRoutes.ROOT;
  }

  _onAddReviewText(movie, comment) {
    this.props.onAddReviewComment(movie, comment);
    history.goBack();
  }

  _setActiveMovie(activeMovieId) {
    const movie = this.props.filmsInfo.find((film) => film.id === activeMovieId);
    this.props.setMovie(movie);
    this.props.setGenre(movie.genre[0]);
  }

  _setActivePage(page) {
    this.props.setPage(page);
  }

  _setActiveGenre(genre) {
    this.props.setGenre(genre);
    this.props.setCardsCount(this.props.filmsInfo.length);
  }

  _changeFavoriteStatus(movie) {
    this.props.changeFavoriteStatus(movie);
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
    switch (this.props.page) {
      case 0:
        return history.push(`${AppRoutes.MOVIE_OVERVIEW}/${this.props.movie.id}`);
      case 1:
        return history.push(`${AppRoutes.MOVIE_DETAILS}/${this.props.movie.id}`);
      case 2:
        return history.push(`${AppRoutes.MOVIE_REVIEWS}/${this.props.movie.id}`);
    }
    return null;
  }

  _getMovie(routeProps) {
    const id = Number(routeProps.match.params.id);
    return this.props.allFilmsInfo.find((film) => film.id === id);
  }

  render() {
    const props = {
      setActiveItem: this._setActivePage,
      tabItems,
      setActiveMovie: this._setActiveMovie,
      favoriteButtonClickHandler: this._changeFavoriteStatus,
      loadReviews: this.props.loadReviews
    };
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoutes.ROOT}>
            {this._renderMainScreen()}
          </Route>
          <Route exact path={AppRoutes.LOGIN}>
            <SignIn
              onSubmit={this._onSignIn}
            />
          </Route>
          <Route exact path={`${AppRoutes.MOVIE_OVERVIEW}/:id`}
            render={(routeProps) => {
              const movie = this._getMovie(routeProps);
              return (
                <MoviecardOverview
                  {...props}
                  movieInfo={movie}
                />
              );
            }}
          />
          <Route exact path={`${AppRoutes.MOVIE_DETAILS}/:id`}
            render={(routeProps) => {
              const movie = this._getMovie(routeProps);
              return (
                <MoviecardDetails
                  {...props}
                  movieInfo={movie}
                />
              );
            }}
          />
          <Route exact path={`${AppRoutes.MOVIE_REVIEWS}/:id`}
            render={(routeProps) => {
              const movie = this._getMovie(routeProps);
              return (
                <MoviecardReviews
                  {...props}
                  movieInfo={movie}
                />
              );
            }}
          />
          <Route exact path={AppRoutes.MY_LIST}>
            <MyList
              setActiveMovie={this._setActiveMovie}
              firstCard={this.props.firstCard}
              lastCard={this.props.lastCard}
            />);
          </Route>
          <PrivateRoute exact path={`${AppRoutes.ADD_REVIEW}/:id`}
            authorizationStatus={this.props.authorizationStatus}
            render={(routeProps) => {
              const id = Number(routeProps.match.params.id);
              const movie = this.props.allFilmsInfo.find((film) => film.id === id);
              return (
                <AddReviewText
                  onSubmit={this._onAddReviewText}
                  movieInfo={movie}
                  avatar={`../${this.props.authorInfo.avatar}`}
                  setPage={this.props.setPage}
                  setMovie={this.props.setMovie}
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
  play: PropTypes.bool,
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
  onAddReviewComment: PropTypes.func.isRequired,
  setAuthorInfo: PropTypes.func,
  resetFavoriteMovie: PropTypes.func.isRequired,
  stopMovie: PropTypes.func.isRequired,
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
});

const mapDispatchToProps = (dispatch) => ({
  setAuthorInfo(authInfo) {
    dispatch(UserCreator.setAuthorInfo(authInfo));
  },
  setGenre(genre) {
    dispatch(DataCreator.setCurrentGenre(genre));
    dispatch(MovieCreator.setFirstCardNumber({firstNumber: 0, maxNumber: MOVIE_CARDS_ON_PAGE}));
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
  changeFavoriteStatus(movie) {
    dispatch(DataOperation.changeFavoriteStatus(movie));
  },
  setCardsCount(count) {
    dispatch(DataCreator.setCardsCount(count));
  },
  loadReviews(movie) {
    dispatch(ReviewOperation.loadReviews(movie));
  },
  onAddReviewComment(movie, review) {
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
