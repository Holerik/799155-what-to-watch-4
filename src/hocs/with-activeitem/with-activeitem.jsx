// with-activeitem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../reducer/data/data.js';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);
      this._mouseClickHandler = this._mouseClickHandler.bind(this);
      this._mouseOverHandler = this._mouseOverHandler.bind(this);
      this.state = {
        activeItem: props.currentActiveItem,
      };
    }

    _mouseOverHandler(index) {
      this.setState({activeItem: index});
    }

    _mouseClickHandler(item) {
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
          mouseClickHandler={this._mouseClickHandler}
          mouseOverHandler={this._mouseOverHandler}
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
