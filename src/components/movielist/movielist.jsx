// movielist.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Moviecard from '../moviecard/moviecard.jsx';
import {fullInfo} from '../../mocks/films.js';

const TIME_INTERVAL = 1000; // ms

class Movielist extends React.PureComponent {
  constructor(props) {
    super(props);
    this._movieCardActivateHandler = this._movieCardActivateHandler.bind(this);
    this._movieCardOutHandler = this._movieCardOutHandler.bind(this);
    this._movieCardClickHandler = this._movieCardClickHandler.bind(this);
    this._waitTimeInterval = this._waitTimeInterval.bind(this);
    this.state = {
      activeMovie: undefined,
      canPlayVideo: false,
    };
    this._lastTimeOut = null;
    this._activeMovieId = -1;
  }

  componentWillUnmount() {
    if (this._lastTimeOut) {
      clearTimeout(this._lastTimeOut);
    }
  }

  _getActiveFilmCard(evt) {
    const target = evt.target;
    const filmCard = this.props.filmsInfo.find((filmInfo) => {
      return filmInfo.id === parseInt(target.id, 10);
    });
    return filmCard;
  }

  _getClickedFilmCard(evt) {
    const {target} = evt;
    const filmCard = this.props.filmsInfo.find((filmInfo) => {
      return filmInfo.title === target.text;
    });
    return filmCard;
  }

  _waitTimeInterval() {
    this.setState({canPlayVideo: true});
  }

  _movieCardActivateHandler(evt) {
    const filmCard = this._getActiveFilmCard(evt);
    this._activeMovieId = (filmCard === undefined ? -1 : filmCard.id);
    this.setState({activeMovie: filmCard});
    if (this._lastTimeOut) {
      clearTimeout(this._lastTimeOut);
    }
    this._lastTimeOut = setTimeout(() => {
      this._waitTimeInterval();
    }, TIME_INTERVAL);
  }

  _movieCardOutHandler() {
    this.setState({activeMovie: undefined});
    this._activeMovieId = -1;
    this.setState({canPlayVideo: false});
    clearTimeout(this._lastTimeOut);
    this._lastTimeOut = null;
  }

  _movieCardClickHandler(evt) {
    evt.preventDefault();
    const filmCard = this._getClickedFilmCard(evt);
    if (filmCard !== undefined) {
      this.props.onMovieTitleClick(filmCard);
    }
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {
          this.props.filmsInfo
          .map((filmInfo) => (
            <Moviecard
              movie={filmInfo}
              onMovieCardActivate={this._movieCardActivateHandler}
              onMovieCardOut={this._movieCardOutHandler}
              onMovieTitleClick={this._movieCardClickHandler}
              canPlayVideo={this.state.canPlayVideo}
              activeMovieId={this._activeMovieId}
              key={filmInfo.id}
            />
          ))
        }
      </div>
    );
  }
}

Movielist.propTypes = {
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)
  ),
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default Movielist;
