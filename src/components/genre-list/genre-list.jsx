// genre-list.jsx
import React from 'react';
import PropTypes from 'prop-types';

class GenreList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._tabMouseOverHandler = this._tabMouseOverHandler.bind(this);
    this._tabClickHandler = this._tabClickHandler.bind(this);
    this._tabItems = this.props.listItems.slice(0, this.props.maxItemsCount);
  }

  _tabMouseOverHandler(evt) {
    const index = this._tabItems.findIndex((item) => {
      return item === evt.target.text;
    });
    this.props.onMouseOver(index);
  }

  _tabClickHandler() {
    this.props.onMouseClick(this.props.activeItem);
  }

  render() {
    const {currentActiveItem, activeItem} = this.props;
    return (
      <ul className="catalog__genres-list"
        onClick={this._tabClickHandler}
        onMouseOver={this._tabMouseOverHandler}
      >
        {this._tabItems.map((item, index) => {
          const itemIsActive = currentActiveItem === index || activeItem === index;
          return (
            <React.Fragment key={index}>
              <li className= {`catalog__genres-item
                            ${itemIsActive ? `catalog__genres-item--active` : ``}`}>
                <a href="#" className="catalog__genres-link">{item}</a>
              </li>
            </React.Fragment>
          );
        })}
      </ul>);
  }
}

GenreList.propTypes = {
  activeItem: PropTypes.number.isRequired,
  currentActiveItem: PropTypes.number.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseClick: PropTypes.func.isRequired,
  maxItemsCount: PropTypes.number.isRequired,
};

export default GenreList;
