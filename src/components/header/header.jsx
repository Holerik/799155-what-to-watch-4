// header.jsx
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthorInfo, getAuthorizationStatus} from '../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getErrShowStatus, getErrMessage} from '../../reducer/error/selectors.js';
import ErrorMsg from '../error-msg/error-msg.jsx';
import {AppRoutes} from '../../const.js';

const Header = React.memo(function Header(props) {
  const {avatar, showErrMessage, errMessage} = props;

  return <React.Fragment>
    <header className="page-header movie-card__head">
      <div className="logo">
        <a href="/" className="logo__link">
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
          <Link to={AppRoutes.MY_LIST}>
            <div className="user-block__avatar">
              <img src={`../${avatar}`} alt="User avatar" width="63" height="63"/>
            </div>
          </Link>}
        {props.authorizationStatus === AuthorizationStatus.NO_AUTH &&
          <div className="user-block__link">
            <Link to={AppRoutes.LOGIN} className="logo__link">
              <span className="logo__letter">Sign In</span>
            </Link>
          </div>}
      </div>
    </header>
  </React.Fragment>;
});

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
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

export {Header};
export default connect(mapStateToProps)(Header);
