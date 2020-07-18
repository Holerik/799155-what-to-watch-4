// footer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {connect} from 'react-redux';

const Footer = React.memo(function Footer(props) {
  const initState = () => {
    props.setPage(0);
    props.setMovie(undefined);
  };
  return <React.Fragment>
    <footer className="page-footer">
      <div className="logo">
        <a href="/" className="logo__link logo__link--light" onClick={initState}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </React.Fragment>;
});

Footer.propTypes = {
  setPage: PropTypes.func.isRequired,
  setMovie: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setPage: (page) => {
    dispatch(ActionCreator.setPage(page));
  },
  setMovie: (movie) => {
    dispatch(ActionCreator.setMovie(movie));
  },
});

export {Footer};
export default connect(null, mapDispatchToProps)(Footer);
