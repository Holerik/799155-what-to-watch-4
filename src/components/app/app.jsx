// app.jsx
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getAuthorInfo} from '../../reducer/user/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';
import {
  Operation as ReviewOperation,
} from '../../reducer/review/review.js';
import withAddReview from '../../hocs/with-addreview/with-addreview.jsx';
import AddReview from '../add-review/add-review.jsx';
import {ShowMode, Operation as DataOperation} from '../../reducer/data/data.js';

const AddReviewText = withAddReview(AddReview);
const tabItems = [`Overview`, `Details`, `Reviews`];

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onMovieTitleClick = this._onMovieTitleClick.bind(this);
    this._setActivePage = this._setActivePage.bind(this);
    this._setActiveGenre = this._setActiveGenre.bind(this);
    this._setActiveMovie = this._setActiveMovie.bind(this);
    this._onSignIn = this._onSignIn.bind(this);
  }

  _onSignIn(authData) {
    this.props.login(authData);
    location.href = `/`;
  }

  _onMovieTitleClick(movie) {
    this.props.setMovie(movie);
  }

  _onAddReviewText(movie, comment) {
    this.props.onAddReviewComment(movie, comment);
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

  _renderApp(mode) {
    if (this.props.movie === undefined) {
      switch (mode) {
        case ShowMode.GENRE_MODE:
          return (
            <Main
              promoMovie={this.props.promo}
              setActiveMovie={this._setActiveMovie}
              onSelectGenre={this._setActiveGenre}
              genre={this.props.genre}
              firstCard={this.props.firstCard}
              lastCard={this.props.lastCard}
              favoriteButtonClickHandler={this.props.changeFavoriteStatus}
            />);
        case ShowMode.FAVORITE_MODE:
          return (
            <MyList
              setActiveMovie={this._setActiveMovie}
              firstCard={this.props.firstCard}
              lastCard={this.props.lastCard}
            />);
      }
    }
    const props = {
      movieInfo: this.props.movie,
      setActiveItem: this._setActivePage,
      tabItems,
      setActiveMovie: this._setActiveMovie,
      favoriteButtonClickHandler: this.props.changeFavoriteStatus,
      loadReviews: this.props.loadReviews
    };
    switch (this.props.page) {
      case 0:
        return (
          <MoviecardOverview
            {...props}
          />
        );
      case 1:
        return (
          <MoviecardDetails
            {...props}
          />
        );
      case 2:
        return (
          <MoviecardReviews
            {...props}
          />
        );
    }
    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp(ShowMode.GENRE_MODE)}
          </Route>
          <Route exact path="/sign-in">
            <SignIn
              onSubmit={this._onSignIn}
            />
          </Route>
          <Route exact path="/my-list">
            {this._renderApp(ShowMode.FAVORITE_MODE)}
          </Route>
          <Route exact path="/add-review">
            <AddReviewText
              onSubmit={this._onAddReviewText}
              movieInfo={this.props.filmsInfo[0]}
              avatar={this.props.authorInfo.avatar}
              setPage={this.props.setPage}
              setMovie={this.props.setMovie}
            />
          </Route>
          <Route exact path="/dev-component">
            <Component />
          </Route>
        </Switch>
      </BrowserRouter>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};
