// movielist.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Moviecard from '../moviecard/moviecard.jsx';
import {shortInfo} from '../../mocks/films.js';

class Movielist extends React.PureComponent {
  constructor(props) {
    super(props);
    this._movieCardActivateHandler = this._movieCardActivateHandler.bind(this);
    this._movieCardOutHandler = this._movieCardOutHandler.bind(this);
    this._movieCardClickHandler = this._movieCardClickHandler.bind(this);
    this.state = {
      activeMovie: undefined,
    };
  }

  _getActiveFilmCard(evt) {
    const target = evt.target;
    const filmCard = this.props.filmsInfo.find((filmInfo) => {
      return filmInfo.id === parseInt(target.id, 10);
    });
    return filmCard;
  }

  _getClickedFilmCard(evt) {
    const target = evt.target;
    const filmCard = this.props.filmsInfo.find((filmInfo) => {
      return filmInfo.title === target.text;
    });
    return filmCard;
  }

  _movieCardActivateHandler(evt) {
    const filmCard = this._getActiveFilmCard(evt);
    this.setState({activeMovie: filmCard});
  }

  _movieCardOutHandler() {
    this.setState({activeMovie: undefined});
  }

  _movieCardClickHandler(evt) {
    evt.preventDefault();
    const filmCard = this._getClickedFilmCard(evt);
    if (filmCard !== undefined) {
      this.props.onMovieTitleClick(filmCard);
    }
  }

  render() {
    return <React.Fragment>
      <div className="catalog__movies-list">
        {
          this.props.filmsInfo
          .map((filmInfo) => (
            <Moviecard
              movie={filmInfo}
              onMovieCardActivate={this._movieCardActivateHandler}
              onMovieCardOut={this._movieCardOutHandler}
              onMovieTitleClick={this._movieCardClickHandler}
              key={filmInfo.id}
            />
          ))
        }
      </div>
    </React.Fragment>;
  }
}

Movielist.propTypes = {
  filmsInfo: PropTypes.arrayOf(
      PropTypes.exact(shortInfo)
  ),
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default Movielist;
