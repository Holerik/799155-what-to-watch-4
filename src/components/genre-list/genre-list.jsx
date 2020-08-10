// genre-list.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const.js';

class GenreList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onMouseOverTab = this._onMouseOverTab.bind(this);
    this._onMouseClickTab = this._onMouseClickTab.bind(this);
  }

  _onMouseOverTab(evt) {
    const index = this.props.listItems.indexOf(evt.target.text);
    this.props.mouseOverHandler(index);
  }

  _onMouseClickTab(evt) {
    const index = this.props.listItems.indexOf(evt.target.text);
    this.props.mouseClickHandler(index);
  }

  render() {
    const {currentActiveItem, listItems} = this.props;
    return (
      <ul className="catalog__genres-list"
        onClick={this._onMouseClickTab}
        onMouseOver={this._onMouseOverTab}
      >
        {listItems.slice(0, this.props.maxItemsCount).map((item, index) => {
          const itemIsActive = currentActiveItem === index;
          return (
            <React.Fragment key={index}>
              <li className= {`catalog__genres-item
                            ${itemIsActive ? `catalog__genres-item--active` : ``}`}>
                <Link to={`${AppRoutes.ROOT}`} className="catalog__genres-link">{item}</Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>);
  }
}

GenreList.propTypes = {
  currentActiveItem: PropTypes.number.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  mouseOverHandler: PropTypes.func.isRequired,
  mouseClickHandler: PropTypes.func.isRequired,
  maxItemsCount: PropTypes.number.isRequired,
};

export default GenreList;
