// header.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getAuthorInfo, getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getErrShowStatus, getErrMessage} from '../../reducer/error/selectors.js';
import ErrorMsg from '../error-msg/error-msg.jsx';

const Header = React.memo(function Header(props) {
  const {avatar, showErrMessage, errMessage} = props;
  const initState = () => {
    props.setPage(0);
    props.setMovie(undefined);
  };

  return <React.Fragment>
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href="/" className="logo__link" onClick={initState}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>
      {showErrMessage &&
      <ErrorMsg
        errMessage={errMessage}
      />
      }
      <div className="user-block">
        {props.authorizationStatus === AuthorizationStatus.AUTH &&
        <div className="user-block__avatar">
          <img src={avatar} alt="User avatar" width="63" height="63"
            onClick={() => {
              location.href = `/my-list`;
            }}
          />
        </div>}
        {props.authorizationStatus === AuthorizationStatus.NO_AUTH &&
        <div className="user-block__link">
          <a href="/sign-in" className="logo__link">
            <span className="logo__letter">Sign In</span>
          </a>
        </div>}
      </div>
    </header>
  </React.Fragment>;
});

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  setMovie: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.oneOf([
    AuthorizationStatus.AUTH,
    AuthorizationStatus.NO_AUTH
  ]),
  showErrMessage: PropTypes.bool,
  errMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  avatar: getAuthorInfo(state).avatar,
  authorizationStatus: getAuthorizationStatus(state),
  showErrMessage: getErrShowStatus(state),
  errMessage: getErrMessage(state),
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
