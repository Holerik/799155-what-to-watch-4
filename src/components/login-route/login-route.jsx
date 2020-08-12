// login-route.jsx
import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {AppRoutes} from '../../const.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import PropTypes from 'prop-types';

const LoginRoute = (props) => {
  const {authorizationStatus, exact, render, path} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        return authorizationStatus === AuthorizationStatus.AUTH ?
          <Redirect to={AppRoutes.ROOT} /> : render();
      }}
    />
  );
};

LoginRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  render: PropTypes.func,
  authorizationStatus: PropTypes.oneOf([
    AuthorizationStatus.AUTH,
    AuthorizationStatus.NO_AUTH
  ]),
};

export default LoginRoute;
