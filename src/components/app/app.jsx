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
  }

  _onMovieTitleClick(movie) {
    this.props.setMovie(movie);
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
          onMovieTitleClick={this._onMovieTitleClick}
          onSelectGenre={this._setActiveGenre}
          genre={this.props.genre}
        />);
    }
    const props = {
      movieInfo: this.props.movie,
      setActiveItem: this._setActivePage,
      tabItems,
      filmsInfo: this.props.filmsInfo,
      onMovieTitleClick: this._onMovieTitleClick,
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
  setPage: PropTypes.func.isRequired,
  setMovie: PropTypes.func.isRequired,
  setPromo: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie,
  page: state.page,
  genre: state.genre,
  filmsInfo: state.movies,
  promo: state.promo,
});

const mapDispatchToProps = (dispatch) => ({
  setGenre(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
    dispatch(ActionCreator.getFilmsInfo(genre));
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
