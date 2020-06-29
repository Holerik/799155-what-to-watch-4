// with-tabs.jsx
import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this._tabMouseOverHandler = this._tabMouseOverHandler.bind(this);
    this._tabClickHandler = this._tabClickHandler.bind(this);
    this.state = {
      activeItem: props.activeItem,
    };
    this.stateItem = props.activeItem;
  }

  _tabMouseOverHandler(evt) {
    const index = this.props.tabItems.findIndex((item) => {
      return item === evt.target.text;
    });
    this.setState({activeItem: index});
  }

  _tabClickHandler() {
    this.props.setActiveItem(this.state.activeItem);
  }

  render() {
    const {activeItem, tabItems} = this.props;
    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list"
            onClick={this._tabClickHandler}
            onMouseOver={this._tabMouseOverHandler}
          >
            <React.Fragment> {
              tabItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li className= {`movie-nav__item
                            ${this.stateItem === index ||
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
  setActiveItem: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tabs;
