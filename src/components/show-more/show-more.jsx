// show-more.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/movie/movie.js';
import {getCardsCount} from '../../reducer/data/selectors.js';
import {getLastCardNumber} from '../../reducer/movie/selectors.js';

const ShowMore = React.memo(function ShowMore(props) {
  const {lastCard, cardsCount, showMoreClickHandler} = props;
  return (
    <div className="catalog__more">
      <button className={`catalog__button ${lastCard + 1 < cardsCount ? `` : `visually-hidden`}`}
        type="button" onClick={() => showMoreClickHandler(lastCard + 1, cardsCount)}>Show more</button>
    </div>
  );
});

const mapStateToProps = (state) => ({
  lastCard: getLastCardNumber(state),
  cardsCount: getCardsCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  showMoreClickHandler: (firstNumber, maxNumber) => {
    dispatch(ActionCreator.setFirstCardNumber({firstNumber, maxNumber}));
  }
});

ShowMore.propTypes = {
  lastCard: PropTypes.number.isRequired,
  cardsCount: PropTypes.number.isRequired,
  showMoreClickHandler: PropTypes.func.isRequired,
};

export {ShowMore};
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);

