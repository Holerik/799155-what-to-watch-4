// controls.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {fullInfo} from '../../reducer/data/data.js';

const Controls = React.memo(function Controls(props) {
  const {favoriteButtonClickHandler, authorizationStatus, movieInfo} = props;
  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <React.Fragment>
        <button className="btn btn--list movie-card__button"
          type="button" onClick={() => favoriteButtonClickHandler(movieInfo)}
        >
          <svg viewBox="0 0 19 20" width="19" height="20">
            {movieInfo.favorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
          </svg>
          <span>My list</span>
        </button>
        <a href="/add-review" className="btn movie-card__button">Add review</a>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className="btn btn--list movie-card__button">
        <a href="/sign-in" className="logo__link">
          <span>My list</span>
        </a>
      </div>
    </React.Fragment>
  );
});

Controls.propTypes = {
  favoriteButtonClickHandler: PropTypes.func.isRequired,
  movieInfo: PropTypes.exact(fullInfo).isRequired,
  authorizationStatus: PropTypes.oneOf([
    AuthorizationStatus.AUTH,
    AuthorizationStatus.NO_AUTH
  ]),
};
export default Controls;
