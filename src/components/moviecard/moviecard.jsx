// moviecard.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Moviecard = (props) => {
  return <React.Fragment>
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link"
          href="" onClick={props.onTitleClickHandler}>{props.title}</a>
      </h3>
    </article>
  </React.Fragment>;
};

Moviecard.propTypes = {
  title: PropTypes.string.isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
};

export default Moviecard;
