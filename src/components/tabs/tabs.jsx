// with-tabs.jsx
import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onMouseOverTab = this.onMouseOverTab.bind(this);
    this.onMouseClickTab = this.onMouseClickTab.bind(this);
  }

  onMouseOverTab(evt) {
    const index = this.props.listItems.findIndex((item) => {
      return item === evt.target.text;
    });
    this.props.onMouseOver(index);
  }

  onMouseClickTab(evt) {
    const index = this.props.listItems.findIndex((item) => {
      return item === evt.target.text;
    });
    this.props.onMouseClick(index);
  }

  render() {
    const {listItems, activeItem} = this.props;
    const stateItem = this.props.activeItem;
    return (
      <React.Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list"
            onClick={this.onMouseClickTab}
            onMouseOver={this.onMouseOverTab}
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
  onMouseClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
};

export default Tabs;
