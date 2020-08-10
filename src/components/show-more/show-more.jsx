// show-more.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {ShowMode} from '../../reducer/data/data.js';
import {getFavoriteFilms, getFilmsByGenre} from '../../reducer/data/selectors.js';
import {getLastCardNumber} from '../../reducer/movie/selectors.js';

const ShowMore = React.memo(function ShowMore(props) {
  const {lastCard, cardsCount, favoritesCount, onShowMoreButtonClick, showMode} = props;
  const count = showMode === ShowMode.GENRE_MODE ? cardsCount : favoritesCount;
  return (
    <div className="catalog__more">
      <button className={`catalog__button ${lastCard + 1 < count ? `` : `visually-hidden`}`}
        type="button" onClick={() => onShowMoreButtonClick(lastCard + 1, count)}>Show more</button>
    </div>
  );
});

const mapStateToProps = (state) => ({
  lastCard: getLastCardNumber(state),
  cardsCount: getFilmsByGenre(state).length,
  favoritesCount: getFavoriteFilms(state).length,
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick: (firstNumber, maxNumber) => {
    dispatch(ActionCreator.setFirstCardNumber({firstNumber, maxNumber}));
  }
});

ShowMore.propTypes = {
  lastCard: PropTypes.number.isRequired,
  cardsCount: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  showMode: PropTypes.oneOf([
    ShowMode.GENRE_MODE,
    ShowMode.FAVORITE_MODE
  ]),
};

export {ShowMore};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);

