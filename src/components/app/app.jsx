// app.jsx
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviecardDetails from '../moviecard-details/moviecard-details.jsx';
import MoviecardOverview from '../moviecard-overview/moviecard-overview.jsx';
import MoviecardReviews from '../moviecard-reviews/moviecard-reviews.jsx';
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
  getCardsCount
} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getAuthorInfo} from '../../reducer/user/selectors.js';
import SignIn from '../sign-in/sign-in.jsx';

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
    location.href = `\\`;
  }

  _onMovieTitleClick(movie) {
    this.props.setMovie(movie);
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
  }

  _renderApp() {
    if (this.props.movie === undefined) {
      return (
        <Main
          promoMovie={this.props.promo}
          setActiveMovie={this._setActiveMovie}
          onSelectGenre={this._setActiveGenre}
          genre={this.props.genre}
          firstCard={this.props.firstCard}
          lastCard={this.props.lastCard}
        />);
    }
    const props = {
      movieInfo: this.props.movie,
      setActiveItem: this._setActivePage,
      tabItems,
      setActiveMovie: this._setActiveMovie,
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
    // }
    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/sign-in">
            <SignIn
              onSubmit={this._onSignIn}
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
  firstCard: PropTypes.number,
  lastCard: PropTypes.number,
  cardsCount: PropTypes.number,
  setPage: PropTypes.func.isRequired,
  setMovie: PropTypes.func.isRequired,
  setPromo: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([
    AuthorizationStatus.AUTH,
    AuthorizationStatus.NO_AUTH
  ]),
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
  cardsCount: getCardsCount(state),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};
