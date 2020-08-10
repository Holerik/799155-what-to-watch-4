// movielist.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Moviecard from '../moviecard/moviecard.jsx';
import {fullInfo} from '../../reducer/data/data.js';
import {MOVIE_CARDS_ON_PAGE} from '../../const.js';
import {TIME_INTERVAL} from '../../const.js';

class Movielist extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onMovieCardActivate = this.onMovieCardActivate.bind(this);
    this.onMovieCardOut = this.onMovieCardOut.bind(this);
    this.onMovieTitleClick = this.onMovieTitleClick.bind(this);
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

  onMovieCardActivate(evt) {
    const filmCard = this._getActiveFilmCard(evt);
    this._activeMovieId = (filmCard === undefined ? -1 : filmCard.id);
    this.props.onMouseOver(this._activeMovieId);
    if (this._lastTimeOut) {
      clearTimeout(this._lastTimeOut);
    }
    this._lastTimeOut = setTimeout(() => {
      this._waitTimeInterval();
    }, TIME_INTERVAL);
  }

  onMovieCardOut() {
    this._activeMovieId = -1;
    this.props.onCanPlay(false);
    clearTimeout(this._lastTimeOut);
    this._lastTimeOut = null;
  }

  onMovieTitleClick(evt) {
    evt.preventDefault();
    const filmCard = this._getClickedFilmCard(evt);
    if (filmCard !== undefined) {
      this.props.onMouseClick(filmCard.id);
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
              movieCardActivateHandler={this.onMovieCardActivate}
              movieCardOutHandler={this.onMovieCardOut}
              movieTitleClickHandler={this.onMovieTitleClick}
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
  onMouseOver: PropTypes.func.isRequired,
  onMouseClick: PropTypes.func.isRequired,
  onCanPlay: PropTypes.func.isRequired,
  canPlay: PropTypes.bool.isRequired,
};

export default Movielist;
