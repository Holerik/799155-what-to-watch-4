// genre-list.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {ALL_GENRES} from '../../reducer.js';
import {fullInfo} from '../../mocks/films.js';

const MAX_GENRE_COUNT = 10;

class GenreList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._tabMouseOverHandler = this._tabMouseOverHandler.bind(this);
    this._tabClickHandler = this._tabClickHandler.bind(this);
    this._tabItems = [ALL_GENRES];
    for (const movie of props.movies) {
      this._tabItems = this._tabItems.concat(movie.genre.filter((item) => {
        return !this._tabItems.includes(item);
      }));
    }
    this._tabItems = this._tabItems.slice(0, MAX_GENRE_COUNT);
    this.state = {
      activeItem: 0,
    };
  }

  _tabMouseOverHandler(evt) {
    const index = this._tabItems.findIndex((item) => {
      return item === evt.target.text;
    });
    this.setState({activeItem: index});
  }

  _tabClickHandler() {
    this.props.setActiveGenre(this._tabItems[this.state.activeItem]);
  }

  render() {
    const stateItem = this._tabItems.indexOf(this.props.activeGenre);
    const {activeItem} = this.state;
    return (
      <ul className="catalog__genres-list"
        onClick={this._tabClickHandler}
        onMouseOver={this._tabMouseOverHandler}
      >
        {this._tabItems.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <li className= {`catalog__genres-item
                            ${stateItem === index ||
                            activeItem === index ? `catalog__genres-item--active` : ``}`}>
                <a href="#" className="catalog__genres-link">{item}</a>
              </li>
            </React.Fragment>
          );
        })}
      </ul>);
  }
}

GenreList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.exact(fullInfo)).isRequired,
  setActiveGenre: PropTypes.func.isRequired,
};

export default GenreList;
