// app.jsx
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviecardDetails from '../moviecard-details/moviecard-details.jsx';
import {fullInfo} from '../../mocks/films.js';


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMovie: undefined,
    };
    this._onMovieTitleClick = this._onMovieTitleClick.bind(this);
  }

  _onMovieTitleClick(movie) {
    this.setState({selectedMovie: movie});
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
    return (
      <MoviecardDetails
        movieInfo={this.state.selectedMovie}
      />
    );
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
