// with-canplay.jsx
import React from 'react';
import PropTypes from 'prop-types';

const withCanPlay = (Component) => {
  class WithCanPlay extends React.PureComponent {
    constructor(props) {
      super(props);
      this.canPlayHandler = this.canPlayHandler.bind(this);
      this.state = {
        canPlay: false,
      };
    }

    canPlayHandler(play) {
      this.setState({canPlay: play});
    }

    render() {
      return (
        <Component
          {...this.props}
          canPlay={this.state.canPlay}
          onMouseClick={this.props.onMouseClick}
          onMouseOver={this.props.onMouseOver}
          onCanPlay={this.canPlayHandler}
        >
        </Component>
      );
    }
  }

  WithCanPlay.propTypes = {
    onMouseClick: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
  };

  return WithCanPlay;
};

export default withCanPlay;
