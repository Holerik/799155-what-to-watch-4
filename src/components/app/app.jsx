// app.jsx
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import MoviecardDetails from '../moviecard-details/moviecard-details.jsx';
import MoviecardOverview from '../moviecard-overview/moviecard-overview.jsx';
import MoviecardReviews from '../moviecard-reviews/moviecard-reviews.jsx';
import {fullInfo} from '../../mocks/films.js';
import {ActionCreator} from '../../reducer.js';


const tabItems = [`Overview`, `Details`, `Reviews`];

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onMovieTitleClick = this._onMovieTitleClick.bind(this);
    this._setActivePage = this._setActivePage.bind(this);
    this._setActiveGenre = this._setActiveGenre.bind(this);
    this._setActiveMovie = this._setActiveMovie.bind(this);
  }

  _onMovieTitleClick(movie) {
    this.props.setMovie(movie);
  }

  _setActiveMovie(activeMovieId) {
    this.props.setMovie(this.props.filmsInfo.find((movie) => movie.id === activeMovieId));
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
          filmsInfo={this.props.filmsInfo}
          genresList={this.props.genresList}
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
      filmsInfo: this.props.filmsInfo,
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
    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
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
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  movie: PropTypes.exact(fullInfo),
  promo: PropTypes.exact(fullInfo).isRequired,
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
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  page: state.page,
  genre: state.genre,
  genresList: state.genresList,
  filmsInfo: state.movies,
  promo: state.promo,
  firstCard: state.firstCard,
  lastCard: state.lastCard,
});

const mapDispatchToProps = (dispatch) => ({
  setGenre(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
    dispatch(ActionCreator.getFilmsInfo(genre));
    dispatch(ActionCreator.setFirstCardNumber(0));
    dispatch(ActionCreator.setCardCountsToShow());
  },
  setMovie(movie) {
    dispatch(ActionCreator.setMovie(movie));
  },
  setPromo(movie) {
    dispatch(ActionCreator.setPromo(movie));
  },
  setPage(page) {
    dispatch(ActionCreator.setPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};
