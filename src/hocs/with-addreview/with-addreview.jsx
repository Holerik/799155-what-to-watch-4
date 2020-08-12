// with-addreview.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {fullInfo} from '../../reducer/data/data.js';

const withAddReview = (Component) => {
  class WithAddReview extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        textLength: 0,
      };
      this.changeTextLengthHandler = this.changeTextLengthHandler.bind(this);
    }

    changeTextLengthHandler(length) {
      this.setState({textLength: length});
    }

    render() {
      return (
        <Component
          {...this.props}
          onChangeLength={this.changeTextLengthHandler}
          movieInfo={this.props.movieInfo}
          avatar={this.props.avatar}
          setPage={this.props.setPage}
          setMovie={this.props.setMovie}
          onSubmit={this.props.onSubmit}
          loadStatus={this.props.loadStatus}
          textLength={this.state.textLength}
        />
      );
    }
  }

  WithAddReview.propTypes = {
    movieInfo: PropTypes.exact(fullInfo).isRequired,
    avatar: PropTypes.string.isRequired,
    setPage: PropTypes.func.isRequired,
    setMovie: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loadStatus: PropTypes.bool,
  };

  return WithAddReview;
};

export default withAddReview;
