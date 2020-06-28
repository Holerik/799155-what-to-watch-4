// app.jsx
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviecardDetails from '../moviecard-details/moviecard-details.jsx';
import MoviecardOverview from '../moviecard-overview/moviecard-overview.jsx';
import MoviecardReviews from '../moviecard-reviews/moviecard-reviews.jsx';
import {fullInfo} from '../../mocks/films.js';

const tabItems = [`Overview`, `Details`, `Reviews`];

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: undefined,
      activePage: 0,
    };
    this._onMovieTitleClick = this._onMovieTitleClick.bind(this);
    this._setActivePage = this._setActivePage.bind(this);
  }

  _onMovieTitleClick(movie) {
    this.setState({selectedMovie: movie});
  }

  _setActivePage(page) {
    this.setState({activePage: page});
  }

  _renderApp() {
    if (this.state.selectedMovie === undefined) {
      return (
        <Main
          promoMovie={this.props.promoMovie}
          filmsInfo={this.props.filmsInfo}
          onMovieTitleClick={this._onMovieTitleClick}
        />);
    }
    switch (this.state.activePage) {
      case 0:
        return (
          <MoviecardOverview
            movieInfo={this.state.selectedMovie}
            setActiveItem={this._setActivePage}
            tabItems={tabItems}
            filmsInfo={this.props.filmsInfo}
            onMovieTitleClick={this._onMovieTitleClick}
          />
        );
      case 1:
        return (
          <MoviecardDetails
            movieInfo={this.state.selectedMovie}
            setActiveItem={this._setActivePage}
            tabItems={tabItems}
            filmsInfo={this.props.filmsInfo}
            onMovieTitleClick={this._onMovieTitleClick}
          />
        );
      case 2:
        return (
          <MoviecardReviews
            movieInfo={this.state.selectedMovie}
            setActiveItem={this._setActivePage}
            tabItems={tabItems}
            filmsInfo={this.props.filmsInfo}
            onMovieTitleClick={this._onMovieTitleClick}
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
  promoMovie: PropTypes.exact(fullInfo).isRequired,
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
};

export default App;
