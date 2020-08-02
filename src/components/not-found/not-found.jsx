// not-found.jsx
import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const.js';

const NotFound = React.memo(function NotFound() {
  return <React.Fragment>
    <h1 className="not-found">
        404.<br/><br/>
      <small>Page not found</small>
    </h1>
    <div className="not-found">
      <Link to={AppRoutes.ROOT}>Go to main page</Link>
    </div>
  </React.Fragment>;
});

export default NotFound;
