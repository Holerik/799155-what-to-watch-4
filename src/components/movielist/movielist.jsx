// movielist.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Moviecard from '../moviecard/moviecard.jsx';
import {fullInfo} from '../../reducer/data/data.js';
import {MOVIE_CARDS_ON_PAGE} from '../../reducer/movie/movie.js';

const TIME_INTERVAL = 1000; // ms

class Movielist extends React.PureComponent {
  constructor(props) {
    super(props);
    this._movieCardActivateHandler = this._movieCardActivateHandler.bind(this);
    this._movieCardOutHandler = this._movieCardOutHandler.bind(this);
    this._movieCardClickHandler = this._movieCardClickHandler.bind(this);
    this._waitTimeInterval = this._waitTimeInterval.bind(this);
    this._lastTimeOut = null;
    this._activeMovieId = -1;
    this._movieCardFirstOnPage = 0;
    this._movieCardLastOnPage = this._movieCardFirstOnPage + MOVIE_CARDS_ON_PAGE;
  }

  componentWillUnmount() {
    if (this._lastTimeOut) {
      clearTimeout(this._lastTimeOut);
    }
  }

  _getActiveFilmCard(evt) {
    const target = evt.target;
    const filmCard = this.props.listItems.find((filmInfo) => {
      return filmInfo.id === parseInt(target.id, 10);
    });
    return filmCard;
  }

  _getClickedFilmCard(evt) {
    const {target} = evt;
    const filmCard = this.props.listItems.find((filmInfo) => {
      return filmInfo.title === target.text;
    });
    return filmCard;
  }

  _waitTimeInterval() {
    this.props.onCanPlay(true);
  }

  _movieCardActivateHandler(evt) {
    const filmCard = this._getActiveFilmCard(evt);
    this._activeMovieId = (filmCard === undefined ? -1 : filmCard.id);
    this.props.mouseOverHandler(this._activeMovieId);
    if (this._lastTimeOut) {
      clearTimeout(this._lastTimeOut);
    }
    this._lastTimeOut = setTimeout(() => {
      this._waitTimeInterval();
    }, TIME_INTERVAL);
  }

  _movieCardOutHandler() {
    this._activeMovieId = -1;
    this.props.onCanPlay(false);
    clearTimeout(this._lastTimeOut);
    this._lastTimeOut = null;
  }

  _movieCardClickHandler(evt) {
    evt.preventDefault();
    const filmCard = this._getClickedFilmCard(evt);
    if (filmCard !== undefined) {
      this.props.mouseClickHandler(filmCard.id);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {this.props.listItems.slice(this._movieCardFirstOnPage, this._movieCardLastOnPage)
          .map((filmInfo) => (
            <Moviecard
              movie={filmInfo}
              onMovieCardActivate={this._movieCardActivateHandler}
              onMovieCardOut={this._movieCardOutHandler}
              onMovieTitleClick={this._movieCardClickHandler}
              canPlayVideo={this.props.canPlay}
              activeMovieId={this._activeMovieId}
              key={filmInfo.id}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

Movielist.propTypes = {
  listItems: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  mouseOverHandler: PropTypes.func.isRequired,
  mouseClickHandler: PropTypes.func.isRequired,
  onCanPlay: PropTypes.func.isRequired,
  canPlay: PropTypes.bool.isRequired,
};

export default Movielist;
