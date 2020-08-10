// with-tabs.jsx
import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onMouseOverTab = this._onMouseOverTab.bind(this);
    this._onMouseClickTab = this._onMouseClickTab.bind(this);
  }

  _onMouseOverTab(evt) {
    const index = this.props.listItems.findIndex((item) => {
      return item === evt.target.text;
    });
    this.props.mouseOverHandler(index);
  }

  _onMouseClickTab(evt) {
    const index = this.props.listItems.findIndex((item) => {
      return item === evt.target.text;
    });
    this.props.mouseClickHandler(index);
  }

  render() {
    const {listItems, activeItem} = this.props;
    const stateItem = this.props.activeItem;
    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list"
            onClick={this._onMouseClickTab}
            onMouseOver={this._onMouseOverTab}
          >
            <React.Fragment> {
              listItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li className= {`movie-nav__item
                            ${stateItem === index ||
                            activeItem === index ? `movie-nav__item--active` : ``}`}>
                      <a href="#" className="movie-nav__link">{item}</a>
                    </li>
                  </React.Fragment>
                );
              })
            }
            </React.Fragment>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

Tabs.propTypes = {
  activeItem: PropTypes.number.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  mouseClickHandler: PropTypes.func.isRequired,
  mouseOverHandler: PropTypes.func.isRequired,
};

export default Tabs;
