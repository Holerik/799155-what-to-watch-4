// with-addreview.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../reducer/data/data.js';

const withAddReview = (Component) => {
  class WithAddReview extends React.PureComponent {
    constructor(props) {
      super(props);
      this.initState = {
        textLength: 0,
      };
      this.state = this.initState;
      this._changeTextLength = this._changeTextLength.bind(this);
    }

    _changeTextLength(length) {
      this.setState({textLength: length});
    }

    render() {
      return (
        <Component
          {...this.props}
          onChangeLength={this._changeTextLength}
          movieInfo={this.props.movieInfo}
          avatar={this.props.avatar}
          setPage={this.props.setPage}
          setMovie={this.props.setMovie}
          onSubmit={this.props.onSubmit}
        >
        </Component>
      );
    }
  }

  WithAddReview.propTypes = {
    movieInfo: PropTypes.exact(fullInfo).isRequired,
    avatar: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired,
    setMovie: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return WithAddReview;
};

export default withAddReview;
