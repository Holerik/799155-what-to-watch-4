// private-route.jsx
import React from 'react';
import {Route, Redirect} from "react-router-dom";
import {AppRoutes} from '../../const.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
  const {authorizationStatus, exact, render, path} = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return authorizationStatus === AuthorizationStatus.AUTH ?
          render(routeProps) : <Redirect to={AppRoutes.LOGIN} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  render: PropTypes.func,
  authorizationStatus: PropTypes.oneOf([
    AuthorizationStatus.AUTH,
    AuthorizationStatus.NO_AUTH
  ]),
};

export default PrivateRoute;
