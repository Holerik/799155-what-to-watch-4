// with-activeitem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../reducer/data/data.js';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);
      this._onMouseClick = this._onMouseClick.bind(this);
      this._onMouseOver = this._onMouseOver.bind(this);
      this.state = {
        activeItem: props.currentActiveItem,
      };
    }

    _onMouseOver(index) {
      this.setState({activeItem: index});
    }

    _onMouseClick(item) {
      this.props.setActiveItem(item);
    }

    render() {
      if (this.props.listItems === null) {
        return null;
      }
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onMouseClick={this._onMouseClick}
          onMouseOver={this._onMouseOver}
        >
        </Component>
      );
    }
  }

  WithActiveItem.propTypes = {
    currentActiveItem: PropTypes.number,
    setActiveItem: PropTypes.func.isRequired,
    listItems: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.exact(fullInfo)).isRequired,
    ]),
    maxItemsCount: PropTypes.number,
  };

  return WithActiveItem;
};

export default withActiveItem;
