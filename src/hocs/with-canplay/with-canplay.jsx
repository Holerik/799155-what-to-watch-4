// with-canplay.jsx
import React from 'react';
import PropTypes from 'prop-types';

const withCanPlay = (Component) => {
  class WithCanPlay extends React.PureComponent {
    constructor(props) {
      super(props);
      this._onCanPlay = this._onCanPlay.bind(this);
      this.state = {
        canPlay: false,
      };
    }

    _onCanPlay(play) {
      this.setState({canPlay: play});
    }

    render() {
      return (
        <Component
          {...this.props}
          canPlay={this.state.canPlay}
          onMouseClick={this.props.mouseClickHandler}
          onMouseOver={this.props.mouseOverHandler}
          onCanPlay={this._onCanPlay}
        >
        </Component>
      );
    }
  }

  WithCanPlay.propTypes = {
    mouseClickHandler: PropTypes.func.isRequired,
    mouseOverHandler: PropTypes.func.isRequired,
  };

  return WithCanPlay;
};

export default withCanPlay;
