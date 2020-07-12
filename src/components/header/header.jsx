// header.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getAuthorInfo} from '../../reducer/user/selectors.js';

const Header = (props) => {
  const {avatar} = props;
  const initState = () => {
    props.setPage(0);
    props.setMovie(undefined);
  };

  return <React.Fragment>
    <div className="logo">
      <a href="/" className="logo__link" onClick={initState}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>

    <div className="user-block">
      <div className="user-block__avatar">
        <img src={avatar} alt="User avatar" width="63" height="63" />
      </div>
    </div>
  </React.Fragment>;
};

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  setMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  avatar: getAuthorInfo(state).avatar,
});

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => {
    dispatch(ActionCreator.setPage(page));
  },
  setMovie: (movie) => {
    dispatch(ActionCreator.setMovie(movie));
  },
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
