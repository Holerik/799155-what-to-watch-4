// controls.jsx
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {fullInfo} from '../../reducer/data/data.js';
import {AppRoutes} from '../../const.js';
import {connect} from 'react-redux';
import {getMovie} from '../../reducer/movie/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';
import history from '../../history.js';

const Controls = React.memo(function Controls(props) {
  const {favoriteButtonClickHandler, movieInfo} = props;
  return (
    <React.Fragment>
      <button className="btn btn--list movie-card__button"
        type="button" onClick={() => props.authorizationStatus === AuthorizationStatus.AUTH ?
          favoriteButtonClickHandler(movieInfo) : history.push(AppRoutes.LOGIN)}
      >
        <svg viewBox="0 0 19 20" width="19" height="20">
          {movieInfo.favorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
        </svg>
        <span>My list</span>
      </button>
      {props.authorizationStatus === AuthorizationStatus.AUTH &&
        <Link to={props.authorizationStatus === AuthorizationStatus.AUTH ?
          `${AppRoutes.MOVIE}/${movieInfo.id}/review` : AppRoutes.LOGIN}
        className="btn movie-card__button">Add review
        </Link>}
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

const mapStateToProps = (state) => ({
  movieInfo: getMovie(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {Controls};
export default connect(mapStateToProps)(Controls);
